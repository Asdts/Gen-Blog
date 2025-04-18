import mongoose from "mongoose"
const paragraphSchema = new mongoose.Schema({
    paragraphs: [
      {
        heading: { type: String },
        text: { type: String, required: true }
      }
    ]
  }, { timestamps: true })
  
  const ParagraphModel = mongoose.models.Paragraph || mongoose.model("Paragraph", paragraphSchema)
  export default ParagraphModel
  