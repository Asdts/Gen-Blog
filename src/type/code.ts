import mongoose from "mongoose";

const CodeSchema = new  mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        theme: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    }
)

const CodeModel = mongoose.models.Code || mongoose.model("Code", CodeSchema);
export default CodeModel;