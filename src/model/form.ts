import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    formTag: [
      {
        tagname: { type: String, required: true },
        attributes: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        children: [
          {
            tagname: { type: String, required: true },
            attributes: [
              {
                name: { type: String, required: true },
                value: { type: String, required: true },
              },
            ],
            children: [
              {
                tagname: { type: String, required: true },
                attributes: [
                  {
                    name: { type: String, required: true },
                    value: { type: String, required: true },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const FormModel = mongoose.models.Form || mongoose.model("Form", formSchema);
export default FormModel;
