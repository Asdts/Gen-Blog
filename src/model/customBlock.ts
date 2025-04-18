import mongoose from "mongoose"
const customBlockSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., 'testimonial', 'feature', 'pricing'
    data: mongoose.Schema.Types.Mixed,      // allow any structure
  }, { timestamps: true })
  
  const CustomBlockModel = mongoose.models.CustomBlock || mongoose.model("CustomBlock", customBlockSchema)
  export default CustomBlockModel
  