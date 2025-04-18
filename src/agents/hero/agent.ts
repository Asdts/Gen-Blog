import { BaseAgent } from '../BaseAgent'

export class HeroAgent extends BaseAgent {
  static NAME = 'hero_agent'
  NAME = HeroAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant that generates a hero block (main banner) for a website.

Topic: ${topic}

Format:
${JSON.stringify(blocktype, null, 2)}

Instructions:
- Provide a headline, optional subheading, and CTA.
- Make it attention-grabbing and action-oriented.
- Only return valid JSON, no markdown.
    `.trim()
  }
}
