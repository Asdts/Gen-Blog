// agents/HeaderAgent.ts
import { BaseAgent } from '../BaseAgent'

export class HeaderAgent extends BaseAgent {
  static NAME = 'header_agent'
  NAME = HeaderAgent.NAME

  protected authPrompt(topic: string[], blocktype: any): string {
    return `
You are an AI assistant designed to write header block for a custom website.
Topics: ${topic.join(', ')}.
Generate a navigation header block.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
