import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    navigator: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const HeaderModel = mongoose.models.Header || mongoose.model("Header", headerSchema);
export default HeaderModel;
