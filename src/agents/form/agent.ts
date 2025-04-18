/* eslint-disable @typescript-eslint/no-explicit-any */
import { Content } from '@google/generative-ai'

type GeminiMessage = Content // { role: "user" | "model", parts: [{ text: string }] }

export class FormAgent {
  static NAME = 'form_agent'

  private authPrompt(topic: string,blocktype:any): string {
    return `
You are an AI assistant designed to form content block of my custom website generate only if required
${topic} is topic of website
Your task is to generate a form block that is relevant to the topic for navigation purpose.
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
