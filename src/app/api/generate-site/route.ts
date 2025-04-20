import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/connection/dbConn'
import MainModel from '@/model/main'
import { agents, models, sampleBlockSchema } from '@/utils/block-config'
import { BlockInferenceAgent } from '@/agents/export'
import { GoogleGenerativeAI } from '@google/generative-ai'

const getLLM = (apiKey?: string) => {
  const genAI = new GoogleGenerativeAI(apiKey || process.env.GOOGLE_API || '')
  const model = genAI.getGenerativeModel({ model: process.env.GOOGLE_MODEL || 'gemini-2.0-flash' })
  return async (prompt: any) => await model.generateContent(prompt)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const { topic, parentId, apiKey , sessionId } = await req.json()

  try {
    const llm = getLLM(apiKey)
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

    const slug = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const fullPath = `${slug}` // Consider fullPath hierarchy if needed later

    const child = await MainModel.create({
      title: topic,
      slug,
      fullPath,
      blocks: blocks.filter(Boolean),
      status: 'draft',
      parentPage: parentId,
      sessionId: sessionId,
    })

    await MainModel.findByIdAndUpdate(parentId, { $push: { childrenPages: child._id } })

    return NextResponse.json({ id: child._id })
  } catch (err) {
    console.error('Child page creation failed:', err)
    return NextResponse.json({ error: 'Failed to generate child page' }, { status: 500 })
  }
}
