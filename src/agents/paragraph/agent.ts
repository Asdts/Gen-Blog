import { BaseAgent } from '../BaseAgent'

export class ParagraphAgent extends BaseAgent {
  static NAME = 'paragraph_agent'
  NAME = ParagraphAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant building a paragraph block for a custom website.

Topic: ${topic}

Format:
${JSON.stringify(blocktype, null, 2)}

Instructions:
- Generate 2-3 short paragraphs with optional headings.
- Use clear and concise language.
- Only return a pure JSON object. No markdown, no explanation.
    `.trim()
  }
}
