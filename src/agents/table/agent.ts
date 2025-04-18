import { Content } from '@google/generative-ai'

type GeminiMessage = Content // { role: "user" | "model", parts: [{ text: string }] }

export class TableAgent {
  static NAME = 'table_agent'

  private authPrompt(topic: string,blocktype:any): string {
    return `
You are an AI assistant designed to write Table block of my custom website generate only if required
${topic} is on which table is required
Your task is to generate a table block that is relevant to the topic for navigation purpose.
in format of ${blocktype}
    `.trim()
  }

  getGeminiMessages(topic:string,blocktype:any): GeminiMessage[] {
    return [
      {
        role: 'user',
        parts: [{ text: this.authPrompt(topic,blocktype) }],
      },
    ]
  }

  getAction(generatedText: string): any {
    try {
      return JSON.parse(generatedText)
    } catch (err) {
      console.error('Invalid JSON from Gemini:', err)
      return { error: 'Invalid JSON format' }
    }
  }
}
