import mongoose from "mongoose"
const testimonialSchema = new mongoose.Schema({
    testimonials: [
      {
        name: { type: String, required: true },
        quote: { type: String, required: true },
        title: { type: String },
        avatar: { type: String }
      }
    ]
  }, { timestamps: true })
  
  const TestimonialModel = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)
  export default TestimonialModel
  