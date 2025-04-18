import mongoose from "mongoose";

const dropBlockSchema = new mongoose.Schema(
  {
    type: [
      {
        main: { type: String, required: true },
        sub: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const DropBlockModel = mongoose.models.DropBlock || mongoose.model("DropBlock", dropBlockSchema);
export default DropBlockModel;
