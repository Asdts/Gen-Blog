import mongoose from "mongoose"
const featureSchema = new mongoose.Schema({
    features: [
      {
        icon: { type: String }, // Optional icon name
        title: { type: String, required: true },
        description: { type: String }
      }
    ]
  }, { timestamps: true })
  
  const FeatureModel = mongoose.models.Feature || mongoose.model("Feature", featureSchema)
  export default FeatureModel
  