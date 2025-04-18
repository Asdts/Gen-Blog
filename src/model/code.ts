import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    code: { type: String },
    language: { type: String },
    theme: { type: String},
  },
  { timestamps: true }
);

const CodeModel = mongoose.models.Code || mongoose.model("Code", codeSchema);
export default CodeModel;
