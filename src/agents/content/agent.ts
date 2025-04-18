// agents/ContentAgent.ts
import { BaseAgent } from '../BaseAgent'

export class ContentAgent extends BaseAgent {
  static NAME = 'content_agent'
  NAME = ContentAgent.NAME

  protected authPrompt(topic: string[], blocktype: any): string {
    return `
You are an AI assistant designed to write content block for a custom website.
${topic.join(', ')} are the topics in the website.
Generate a navigation-related content block relevant to these topics.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
