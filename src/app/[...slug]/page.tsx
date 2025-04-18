// app/[...slug]/page.tsx
import connectDB from '@/connection/dbConn'
import MainModel from '@/model/main'
import { models } from '@/utils/block-config'
import GeneratedPage from '@/components/generatedPage'
import { redirect } from 'next/navigation'
import llm from '@/connection/genAI'
import { agents, sampleBlockSchema } from '@/utils/block-config'
import { BlockInferenceAgent } from '@/agents/export'

export default async function SlugPage({ params }: { params: { slug: string[] } }) {
  await connectDB()

  const fullPath = '/' + (params.slug?.join('/') || '')
  let page = await MainModel.findOne({ fullPath }).populate('childrenPages', 'title fullPath').lean()

  if (!page) {
    const pathParts = params.slug || []
    const topicSlug = pathParts.at(-1) || 'page'
    const parentPath = '/' + pathParts.slice(0, -1).join('/')

    // Recursive parent creation logic
    let parent = await MainModel.findOne({ fullPath: parentPath }).lean()
    if (!parent && parentPath !== '/') {
      const grandParts = pathParts.slice(0, -2)
      const grandParentPath = '/' + grandParts.join('/')
      const grandParent = await MainModel.findOne({ fullPath: grandParentPath }).lean()

      const parentSlug = pathParts.at(-2) || 'section'
      const parentTitle = parentSlug.replace(/-/g, ' ')

      parent = await MainModel.create({
        title: parentTitle,
        slug: parentSlug,
        fullPath: parentPath,
        blocks: [],
        parentPage: grandParent?._id || null,
        childrenPages: []
      })

      if (grandParent) {
        await MainModel.findByIdAndUpdate(grandParent._id, { $push: { childrenPages: parent._id } })
      }
    }

    const topic = topicSlug.replace(/[-_]/g, ' ')
    const blockInferAgent = new BlockInferenceAgent()
    const blockInferRes = await llm(blockInferAgent.getGeminiMessages(topic, sampleBlockSchema))
    const inferredBlocks = blockInferAgent.getAction(blockInferRes.response.text())

    const blocks = await Promise.all(
      inferredBlocks.map(async (type) => {
        const agent = agents[type]
        const sample = sampleBlockSchema[type] || {}

        try {
          const res = await llm(agent.getGeminiMessages(topic, sample))
          const parsed = agent.getAction(res.response.text())

          if (!parsed) return null
          if (type === 'code' && typeof parsed.code === 'object') {
            parsed.language = parsed.code.language || 'html'
            parsed.code = parsed.code.content || JSON.stringify(parsed.code)
            parsed.theme = parsed.theme || 'light'
          }

          const saved = await models[type].create(parsed)
          return { type, refId: saved._id }
        } catch (err) {
          return null
        }
      })
    )

    const newPage = await MainModel.create({
      title: topic,
      slug: topicSlug,
      fullPath,
      blocks: blocks.filter(Boolean),
      parentPage: parent?._id || null,
      status: 'draft'
    })

    if (parent) {
      await MainModel.findByIdAndUpdate(parent._id, { $push: { childrenPages: newPage._id } })
    }

    redirect(fullPath)
  }

  const blockData = await Promise.all(
    page.blocks.map(async (block: any) => {
      const data = await models[block.type].findById(block.refId).lean()
      return { type: block.type, data }
    })
  )

  const data = {
    title: page.title,
    blocks: blockData,
    childrenPages: page.childrenPages
  }

  return <GeneratedPage data={JSON.parse(JSON.stringify(data))} />
}