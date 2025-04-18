// models/main.ts
import mongoose from 'mongoose'

const mainSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true }, // e.g., 'blog'
    fullPath: { type: String, required: true, unique: true }, // e.g., '/system-design/blog'
    templateName: { type: String, default: 'default-template' },
    version: { type: Number, default: 1 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    blocks: [
      {
        type: { type: String, required: true },
        refId: { type: mongoose.Schema.Types.ObjectId, required: true }
      }
    ],
    parentPage: { type: mongoose.Schema.Types.ObjectId, ref: 'Main', default: null },
    childrenPages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Main' }]
  },
  { timestamps: true }
)

const MainModel = mongoose.models.Main || mongoose.model('Main', mainSchema)
export default MainModel