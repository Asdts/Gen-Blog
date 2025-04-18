// utils/blocks-config.ts

import CodeModel from '@/model/code'
import ContentModel from '@/model/content'
import DropBlockModel from '@/model/dropBlock'
import FooterModel from '@/model/footer'
import FormModel from '@/model/form'
import HeaderModel from '@/model/header'
import MediaBlockModel from '@/model/mediaBlock'
import JsonToTableModel from '@/model/table'
import ParagraphModel from '@/model/paragraph'
import HeroModel from '@/model/hero'
import TestimonialModel from '@/model/testimonal'
import FeatureModel from '@/model/feature'

import {
  CodeAgent,
  ContentAgent,
  DropAgent,
  FooterAgent,
  FormAgent,
  HeaderAgent,
  MediaAgent,
  TableAgent,
  ParagraphAgent,
  HeroAgent,
  TestimonialAgent,
  FeatureAgent
} from '@/agents/export'

export const agents: Record<string, any> = {
  code: new CodeAgent(),
  content: new ContentAgent(),
  dropBlock: new DropAgent(),
  footer: new FooterAgent(),
  form: new FormAgent(),
  header: new HeaderAgent(),
  mediaBlock: new MediaAgent(),
  table: new TableAgent(),
  paragraph: new ParagraphAgent(),
  hero: new HeroAgent(),
  testimonial: new TestimonialAgent(),
  feature: new FeatureAgent()
}

export const models: Record<string, any> = {
  code: CodeModel,
  content: ContentModel,
  dropBlock: DropBlockModel,
  footer: FooterModel,
  form: FormModel,
  header: HeaderModel,
  mediaBlock: MediaBlockModel,
  table: JsonToTableModel,
  paragraph: ParagraphModel,
  hero: HeroModel,
  testimonial: TestimonialModel,
  feature: FeatureModel
}

export const sampleBlockSchema: Record<string, any> = {
  hero: {
    heading: 'Welcome to My Site',
    subheading: 'A great place to start',
    ctaText: 'Learn More',
    ctaUrl: '/contact'
  },
  paragraph: {
    paragraphs: [
      { heading: 'Our Mission', text: 'We want to educate the world.' }
    ]
  },
  testimonial: {
    testimonials: [
      { name: 'Alice', quote: 'Amazing!', title: 'CEO' }
    ]
  },
  feature: {
    features: [
      { icon: '⭐', title: 'Fast', description: 'Quick and reliable' }
    ]
  },
  form: {
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
              { name: 'name', value: 'email' }
            ],
            children: []
          }
        ]
      }
    ]
  },
  content: {
    content: [
      { title: 'Home', url: '/home' },
      { title: 'About', url: '/about' }
    ]
  },
  table: {
    headers: [{ title: 'Plan' }],
    rows: [{ title: 'Free', url: '' }]
  },
  code: {
    code: '<h1>Hello</h1>',
    language: 'html',
    theme: 'light'
  },
  mediaBlock: {
    type: [
      {
        type: 'image',
        media: {
          url: 'https://example.com/image.jpg',
          alt: 'Example'
        },
        attributes: { height: 400, width: 600 }
      }
    ]
  },
  footer: {
    navigator: [
      { title: 'Privacy', url: '/privacy' }
    ]
  },
  header: {
    navigator: [
      { title: 'Home', url: '/home' },
      { title: 'Contact', url: '/contact' }
    ]
  }
} 