import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/connection/dbConn'
import llm from '@/connection/genAI'

import CodeModel from '@/model/code'
import ContentModel from '@/model/content'
import DropBlockModel from '@/model/dropBlock'
import FooterModel from '@/model/footer'
import FormModel from '@/model/form'
import HeaderModel from '@/model/header'
import MediaBlockModel from '@/model/mediaBlock'
import JsonToTableModel from '@/model/table'
import MainModel from '@/model/main'

import {
  CodeAgent, ContentAgent, DropAgent, FooterAgent,
  FormAgent, HeaderAgent, MediaAgent, TableAgent
} from '@/agents/export'

import { CodeBlockType } from '@/type/code'
import { ContentBlockType } from '@/type/content'
import { DropBlockType } from '@/type/dropBlock'
import { FooterBlockType } from '@/type/footer'
import { FormBlockType } from '@/type/form'
import { HeaderBlockType } from '@/type/header'
import { MediaBlockType } from '@/type/mediaBlock'
import { TableBlockType } from '@/type/table'

export async function POST(req: NextRequest) {
  await connectDB()

  const body = await req.json()
  const { topic, templateName, version = 1 } = body

  if (!topic || !templateName) {
    return NextResponse.json({ error: 'Missing topic or templateName' }, { status: 400 })
  }

  try {
    const codeAgent = new CodeAgent()
    const contentAgent = new ContentAgent()
    const dropAgent = new DropAgent()
    const footerAgent = new FooterAgent()
    const formAgent = new FormAgent()
    const headerAgent = new HeaderAgent()
    const mediaAgent = new MediaAgent()
    const tableAgent = new TableAgent()

    // 🧠 Define expected blockTypes
    const codeBlockType: CodeBlockType = {
      code: '<h1>Hello World</h1>',
      language: 'html',
      theme: 'light'
    }
    const contentBlockType: ContentBlockType = {
      content: [
        {
          title: 'Home',
          url: '/home'
        },
        {
          title: 'About',
          url: '/about'
        }
      ]
    }
    const dropBlockType: DropBlockType = {
      type: [
        {
          main: 'Products',
          sub: 'Drones'
        },
        {
          main: 'Services',
          sub: 'Drone Training'
        }
      ]
    }    
    const footerBlockType: FooterBlockType = {
      navigator: [
        {
          title: 'Privacy Policy',
          url: '/privacy'
        },
        {
          title: 'Terms of Service',
          url: '/terms'
        }
      ]
    }
    const formBlockType: FormBlockType = {
      formTag: [
        {
          tagname: 'form',
          attributes: [
            { name: 'action', value: '/submit' },
            { name: 'method', value: 'post' }
          ],
          children: [
            {
              tagname: 'input',
              attributes: [
                { name: 'type', value: 'text' },
                { name: 'name', value: 'username' }
              ],
              children: [
                {
                  tagname: 'label',
                  attributes: [
                    { name: 'for', value: 'username' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    const headerBlockType: HeaderBlockType = {
      navigator: [
        {
          title: 'Home',
          url: '/home'
        },
        {
          title: 'Contact',
          url: '/contact'
        }
      ]
    }

    
    const mediaBlockType: MediaBlockType = {
      type: [
        {
          type: "image",
          media: {
            url: "https://example.com/image.jpg",
            alt: "A sample image"
          },
          attributes: {
            height: 400,
            width: 600
          }
        }
      ]
    }
    const tableBlockType: TableBlockType = {
      headers: [{ title: '' }],
      rows: [{ title: '', url: '' }]
    }

    // 🔥 Actual Gemini Calls (with blockType)
    const [
      codeRes,
      contentRes,
      dropRes,
      footerRes,
      formRes,
      headerRes,
      mediaRes,
      tableRes
    ] = await Promise.all([
      llm(codeAgent.getGeminiMessages(topic, codeBlockType)),
      llm(contentAgent.getGeminiMessages([topic], contentBlockType)),
      llm(dropAgent.getGeminiMessages([topic], dropBlockType)),
      llm(footerAgent.getGeminiMessages(topic, footerBlockType)),
      llm(formAgent.getGeminiMessages(topic, formBlockType)),
      llm(headerAgent.getGeminiMessages([topic], headerBlockType)),
      llm(mediaAgent.getGeminiMessages([topic], mediaBlockType)),
      llm(tableAgent.getGeminiMessages(topic, tableBlockType))
    ])

    // ✅ Parse & Save
    const parse = (res: any, agent: any) => agent.getAction(res.response.text())

    const codeData = parse(codeRes, codeAgent)
    const contentData = parse(contentRes, contentAgent)
    const dropData = parse(dropRes, dropAgent)
    const footerData = parse(footerRes, footerAgent)
    const formData = parse(formRes, formAgent)
    const headerData = parse(headerRes, headerAgent)
    const mediaData = parse(mediaRes, mediaAgent)
    const tableData = parse(tableRes, tableAgent)

    const [code, content, dropBlock, footer, form, header, mediaBlock, table] = await Promise.all([
      CodeModel.create(codeData),
      ContentModel.create(contentData),
      DropBlockModel.create(dropData),
      FooterModel.create(footerData),
      FormModel.create(formData),
      HeaderModel.create(headerData),
      MediaBlockModel.create(mediaData),
      JsonToTableModel.create(tableData)
    ])

    const main = await MainModel.create({
      title: `${topic} Template`,
      slug: topic.toLowerCase().replace(/\s+/g, '-'),
      templateName,
      version,
      status: 'draft',
      code: code._id,
      content: content._id,
      dropBlock: dropBlock._id,
      footer: footer._id,
      form: form._id,
      header: header._id,
      mediaBlock: mediaBlock._id,
      table: table._id,
    })

    return NextResponse.json({ message: 'Website generated successfully', id: main._id }, { status: 200 })

  } catch (error) {
    console.error('Error in website generation:', error)
    return NextResponse.json({ error: 'Failed to generate website' }, { status: 500 })
  }
}
