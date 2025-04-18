// agents/MediaAgent.ts
import { BaseAgent } from '../BaseAgent'

export class MediaAgent extends BaseAgent {
  static NAME = 'media_agent'
  NAME = MediaAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
  You are an AI assistant designed to generate media blocks for a custom website.
  on topic ${topic}
  Each block must follow this format (do not deviate):
  
  ${JSON.stringify(blocktype, null, 2)}
  
  Where:
  - "type" is either "image" or "video"
  - "media" has a "url" (use any placeholder) and "alt"
  - "attributes" includes numeric height and width
  
  Only return a **valid JSON object** matching this format. No markdown. No explanation.
    `.trim()
  }
  
}
