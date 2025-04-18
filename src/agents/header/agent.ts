// agents/HeaderAgent.ts
import { BaseAgent } from '../BaseAgent'

export class HeaderAgent extends BaseAgent {
  static NAME = 'header_agent'
  NAME = HeaderAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to write a header block for a custom website.

Topic: ${topic}
Generate a navigation header block.
Output format must match this: ${JSON.stringify(blocktype, null, 2)}

Only return a pure JSON response. No markdown, no explanation.
    `.trim()
  }

  getGeminiMessages(topic: string, blocktype: any): any[] {
    return [{ text: this.authPrompt(topic, blocktype) }]
  }
}
