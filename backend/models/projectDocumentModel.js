import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
