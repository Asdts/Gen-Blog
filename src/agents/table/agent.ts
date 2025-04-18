// agents/TableAgent.ts 
import { BaseAgent } from '../BaseAgent'

export class TableAgent extends BaseAgent {
  static NAME = 'table_agent'
  NAME = TableAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant designed to write table block for a custom website.
Generate a table about ${topic} with headers and row data.
Output format must match this: ${blocktype}

Only return a pure JSON response matching the format above.
    `.trim()
  }
}
