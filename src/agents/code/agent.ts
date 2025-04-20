import { BaseAgent } from '../BaseAgent'

export class CodeAgent extends BaseAgent {
  static NAME = 'code_agent'
  NAME = CodeAgent.NAME

  protected authPrompt(topic: string, codetype: any): string {
    return `
You are an AI assistant designed to write code block of my custom website generate only if required
${topic} is the topic of the code block
Your task is to generate a code block that is relevant to the topic.
in format of ${codetype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
