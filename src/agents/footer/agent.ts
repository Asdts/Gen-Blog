// agents/FooterAgent.ts
import { BaseAgent } from '../BaseAgent'

export class FooterAgent extends BaseAgent {
  static NAME = 'footer_agent'
  NAME = FooterAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to write footer block for a custom website.
Topic: ${topic}
Generate footer content relevant to navigation or legal info.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
