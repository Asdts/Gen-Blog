import { BaseAgent } from '../BaseAgent'

export class FeatureAgent extends BaseAgent {
  static NAME = 'feature_agent'
  NAME = FeatureAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI that builds a list of features for a website about "${topic}".

Format:
${JSON.stringify(blocktype, null, 2)}

Instructions:
- Include at least 3 items.
- Use clear titles and short descriptions.
- Only return JSON, no extra text or markdown.
    `.trim()
  }
}
