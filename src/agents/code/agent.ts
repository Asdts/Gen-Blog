/* eslint-disable @typescript-eslint/no-explicit-any */
import { Content } from '@google/generative-ai'

type GeminiMessage = Content // { role: "user" | "model", parts: [{ text: string }] }

export class CodeAgent {
  static NAME = 'code_agent'

  private authPrompt(topic: string,codetype:any): string {
    return `
You are an AI assistant designed to write code block of my custom website generate only if required
${topic} is the topic of the code block
Your task is to generate a code block that is relevant to the topic.
in format of ${codetype}
    `.trim()
  }

  getGeminiMessages(topic:string,codetype:any): GeminiMessage[] {
    return [
      {
        role: 'user',
        parts: [{ text: this.authPrompt(topic,codetype) }],
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
