import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    industry: [String],
    stage: {
      type: String,
      required: true,
    },
    expected_fund: {
      type: Number,
      required: true,
    },
    raised_fund: {
      type: Number,
      default: 0,
    },
    investor_percentage: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
      required: true,
    },
    enterpreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectDetails",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
      },
    ],
    funds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fund",
      },
    ],
    // documents: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Docsets",
    //   },
    // ],
    investors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
