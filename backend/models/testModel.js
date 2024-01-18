import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("testFile", testSchema);

export default Test;
