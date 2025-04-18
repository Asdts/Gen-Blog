import { ParagraphBlockType } from "@/type/paragraph"
const ParagraphBlock = ({ data }: { data: ParagraphBlockType }) => {
    return (
      <div className="space-y-6 text-lg leading-relaxed">
        {data.paragraphs.map((p, i) => (
          <div key={i}>
            {p.heading && <h3 className="text-xl font-semibold mb-2">{p.heading}</h3>}
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    )
  }
  export default ParagraphBlock
  