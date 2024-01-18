import mongoose from "mongoose";

const projectDetailsSchema = mongoose.Schema(
  {
    short_summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
    },
    advantages: {
      type: [String],
    },
    deal: {
      type: String,
      required: true,
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

const ProjectDetails = mongoose.model("ProjectDetails", projectDetailsSchema);

export default ProjectDetails;
