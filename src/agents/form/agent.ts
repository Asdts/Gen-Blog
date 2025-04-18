// agents/FormAgent.ts
import { BaseAgent } from '../BaseAgent'

export class FormAgent extends BaseAgent {
  static NAME = 'form_agent'
  NAME = FormAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to generate a form block for a custom website.
Topic: ${topic}
Form may include inputs like name, email, message, etc.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
