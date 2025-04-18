import mongoose from "mongoose";

const jsonToTableSchema = new mongoose.Schema(
  {
    headers: [
      {
        title: { type: String, required: true },
      },
    ],
    rows: [
      {
        title: { type: String, required: true },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const JsonToTableModel = mongoose.models.JsonToTable || mongoose.model("JsonToTable", jsonToTableSchema);
export default JsonToTableModel;
