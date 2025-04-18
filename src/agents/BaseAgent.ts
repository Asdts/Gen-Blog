// BaseAgent.ts
import { Content } from '@google/generative-ai'

export abstract class BaseAgent {
  abstract NAME: string

  protected abstract authPrompt(topic: any, blocktype: any): string

  getGeminiMessages(topic: any, blocktype: any): Content[] {
    return [
      { text: this.authPrompt(topic, blocktype) }
    ]
  }

  getAction(generatedText: string): any {
    try {
      const jsonMatch = generatedText.match(/{[\s\S]*}/)
      if (!jsonMatch) throw new Error('No JSON found in Gemini output')
  
      const cleaned = jsonMatch[0]
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
  
      return JSON.parse(cleaned)
    } catch (err) {
      console.error(`Invalid JSON from ${this.NAME}:`, err)
      console.log(`🔴 Gemini output from ${this.NAME}:\n`, generatedText)
      return { error: 'Invalid JSON format' }
    }
  }
  
  
}
