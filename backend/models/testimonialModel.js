import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
