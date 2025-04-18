import { BaseAgent } from '../BaseAgent'

export class ContentAgent extends BaseAgent {
  static NAME = 'content_agent'
  NAME = ContentAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to write content blocks for a custom website.

Topic: ${topic}
Your task is to generate a navigation-related content block relevant to this topic.
Output format must match this: ${JSON.stringify(blocktype, null, 2)}

Only return a pure JSON response matching the format above. No markdown or explanation.
    `.trim()
  }

  getGeminiMessages(topic: string, blocktype: any): any[] {
    return [{ text: this.authPrompt(topic, blocktype) }]
  }
}
