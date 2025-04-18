import mongoose from "mongoose"
const heroSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    subheading: { type: String },
    ctaText: { type: String },
    ctaUrl: { type: String }
  }, { timestamps: true })
  
  const HeroModel = mongoose.models.Hero || mongoose.model("Hero", heroSchema)
  export default HeroModel
  