import mongoose from "mongoose";

const fundSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project_percentage: {
      type: Number,
      default: 0,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const Fund = mongoose.model("Fund", fundSchema);

export default Fund;
