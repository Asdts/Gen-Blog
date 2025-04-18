import mongoose from "mongoose";

const mediaBlockSchema = new mongoose.Schema(
  {
    type: [
      {
        type: { type: String, enum: ['image', 'video'], required: true },
        media: {
          url: { type: String, required: true },
          alt: { type: String, required: true },
        },
        attributes: {
          height: { type: Number },
          width: { type: Number },
        },
      },
    ],
  },
  { timestamps: true }
);

const MediaBlockModel = mongoose.models.MediaBlock || mongoose.model("MediaBlock", mediaBlockSchema);
export default MediaBlockModel;
