import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    content: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const ContentModel = mongoose.models.Content || mongoose.model("Content", contentSchema);
export default ContentModel;
