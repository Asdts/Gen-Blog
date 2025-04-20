import CodeBlock from "@/blocks/code/component"
import ContentBlock from "@/blocks/content/component"
import DropBlock from "@/blocks/dropBlock/component"
import FooterBlock from "@/blocks/footer/component"
import FormBlock from "@/blocks/form/component"
import HeaderBlock from "@/blocks/header/component"
import MediaBlock from "@/blocks/mediaBlock/component"
import TableBlock from "@/blocks/table/component"
import FeatureBlock from "@/blocks/feature/component"
import ParagraphBlock from "@/blocks/paragraph/component"
import TestimonialBlock from "@/blocks/testimonal/component"
import HeroBlock from "@/blocks/hero/component"


const componentMap: Record<string, React.FC<{ data: any }>> = {
  code: CodeBlock,
  content: ContentBlock,
  dropBlock: DropBlock,
  footer: FooterBlock,
  form: FormBlock,
  header: HeaderBlock,
  mediaBlock: MediaBlock,
  table: TableBlock,
  feature: FeatureBlock,
  paragraph: ParagraphBlock,
  testimonial: TestimonialBlock,
  hero: HeroBlock,
}


const BlockRenderer = ({ type, data }: { type: string; data: any }) => {
  const Component = componentMap[type]
  if (!Component) return <div className="text-red-500">⚠ Unknown block: {type}</div>
  return <Component data={data} />
}

export default BlockRenderer

