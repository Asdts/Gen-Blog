import { BaseAgent } from '../BaseAgent'

export class TestimonialAgent extends BaseAgent {
  static NAME = 'testimonial_agent'
  NAME = TestimonialAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You're generating a testimonial section for a website about "${topic}".

Format:
${JSON.stringify(blocktype, null, 2)}

Include:
- Names, quotes, and titles of people endorsing the product.
- Optional avatar URLs.
Return only valid JSON matching this format.
    `.trim()
  }
}
