// agents/DropAgent.ts
import { BaseAgent } from '../BaseAgent'

export class DropAgent extends BaseAgent {
  static NAME = 'drop_agent'
  NAME = DropAgent.NAME

  protected authPrompt(topic: string[], blocktype: any): string {
    return `
You are an AI assistant designed to write dropdown block for a custom website.
Topics: ${topic.join(', ')}.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
