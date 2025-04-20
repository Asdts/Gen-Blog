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
  const { topic, templateName = 'default-template', version = 1, apiKey , sessionId } = await req.json()

  if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 })

  try {
    const llm = getLLM(apiKey)
    const blockInferAgent = new BlockInferenceAgent()
    const blockInferRes = await llm(blockInferAgent.getGeminiMessages(topic, sampleBlockSchema))
    const inferredBlocks = blockInferAgent.getAction(blockInferRes.response.text())

    console.log('📦 Gemini-inferred blocks:', inferredBlocks)

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
          console.error(`⚠️ Error generating ${type}:`, err)
          return null
        }
      })
    )

    const validBlocks = blocks.filter(Boolean)

    const slug = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const fullPath = `/${slug}` // Ensure fullPath is set for root-level page

    const page = await MainModel.create({
      title: topic,
      slug,
      fullPath,
      blocks: validBlocks,
      templateName,
      version,
      status: 'draft',
      parentPage: null,
      sessionId: sessionId,
    })

    console.log('✅ Generated page:', page._id, slug)

    return NextResponse.json({ message: 'Site created block-wise', id: page._id, slug, fullPath }, { status: 200 })

  } catch (err) {
    console.error('🛑 Block-wise site generation failed:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
