import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
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

const FooterModel = mongoose.models.Footer || mongoose.model("Footer", footerSchema);
export default FooterModel;
