import mongoose from "mongoose";
import User from "./userModel.js";

const investorSchema = mongoose.Schema(
  {
    investor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    country: {
      type: String,
    },
    mobile: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    minimum: {
      type: Number,
      required: true,
    },
    maximum: {
      type: Number,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    locations: {
      type: [String],
    },
    industries: {
      type: [String],
    },
  },
  {
    timestamp: true,
  }
);

investorSchema.pre("remove", (next) => {
  User.remove({ details: this._id }).exec();
  next();
});

const InvestorDetail = mongoose.model("InvestorDetail", investorSchema);

export default InvestorDetail;
