import { BaseAgent } from '../BaseAgent'

export class SiteGeneratorAgent extends BaseAgent {
  static NAME = 'site_generator_agent'
  NAME = SiteGeneratorAgent.NAME

  protected authPrompt(topic: string, blocktype: any): string {
    return `
You are an AI assistant that generates complete CMS website structures.

Your output must be a JSON object with:
- "title": string (e.g., "Health Hub")
- "slug": kebab-case string (e.g., "health-hub")
- "blocks": an array of block objects, each with:
  - "type": one of [${Object.keys(blocktype).join(', ')}]
  - "data": must follow the structure given for that block type
- Optionally: "pages": array of nested page objects { title, slug, blocks }

Each block must match its structure in the reference formats below:

${Object.entries(blocktype).map(
  ([type, example]) =>
    `📦 ${type} block:\n${JSON.stringify({ type, data: example }, null, 2)}\n`
).join('\n')}

Now generate a complete website JSON for the topic: "${topic}"

⚠️ Return only valid JSON. No explanation, no markdown.
`.trim()
  }
}
