import mongoose from "mongoose";

const mainSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    templateName: { type: String, required: true },
    version: { type: Number, default: 1 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },

    code: { type: mongoose.Schema.Types.ObjectId, ref: "Code" },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
    footer: { type: mongoose.Schema.Types.ObjectId, ref: "Footer" },
    dropBlock: { type: mongoose.Schema.Types.ObjectId, ref: "DropBlock" },
    header: { type: mongoose.Schema.Types.ObjectId, ref: "Header" },
    mediaBlock: { type: mongoose.Schema.Types.ObjectId, ref: "MediaBlock" },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "JsonToTable" },
    form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  },
  { timestamps: true }
);

const MainModel = mongoose.models.Main || mongoose.model("Main", mainSchema);
export default MainModel;
