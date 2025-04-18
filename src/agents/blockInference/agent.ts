// agents/BlockInferenceAgent.ts
import { BaseAgent } from '../BaseAgent'

export class BlockInferenceAgent extends BaseAgent {
  static NAME = 'block_inference_agent'
  NAME = BlockInferenceAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to determine the most relevant website blocks for a given topic.

Your task is to return an array of block types (as strings) based on the input topic:
"${topic}"

Use only these allowed block types:
${Object.keys(blocktype).join(', ')}

The result must be in the following format:
["hero", "paragraph", "form", "feature"]

Rules:
- Do NOT include duplicates.
- Do NOT return markdown.
- Only return a raw JSON array of strings matching the allowed block types.
`.trim()
  }

  getGeminiMessages(topic: string, blocktype: any): any[] {
    return [{ text: this.authPrompt(topic, blocktype) }]
  }

  getAction(generatedText: string): string[] {
    try {
      const match = generatedText.match(/\[[\s\S]*?\]/)
      if (!match) throw new Error('No array format found in Gemini response.')
      const clean = match[0].replace(/```json|```/g, '').trim()
      return JSON.parse(clean)
    } catch (err) {
      console.error('❌ BlockInferenceAgent failed:', err)
      console.error('🔴 Raw Gemini Output:\n', generatedText)
      return []
    }
  }
}
