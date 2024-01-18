import asyncHandler from "express-async-handler";
import Testimonial from "../models/testimonialModel.js";

// @desc    Get testimonials
// Route    Get /api/testimonials
// Access   Private
const getTestimonials = asyncHandler(async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res
      .status(200)
      .json({
        success: true,
        message: "Testimonials found successfully",
        testimonials: testimonials,
      });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

// @desc    Get Testimonial
// Route    Get /api/testimonials/:id
// Access   Private
const getTestimonial = asyncHandler(async (req, res) => {
  try {
    const Testimonial = await Testimonial.findById(req.params.id);

    if (!Testimonial) {
      res.status(400);
      throw new Error("Testimonial not found");
    }

    res
      .status(200)
      .json({
        success: true,
        Testimonial: Testimonial,
        message: "Testimonial found successfully",
      });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

// @desc    Set Testimonial
// Route    Post /api/testimonials
// Access   Private
const setTestimonial = asyncHandler(async (req, res) => {
  const { name, testimonial } = req.body;

  if (req.body.name === "" || req.body.testimonial === "") {
    res.status(401);
    throw new Error("Fill in all fields");
  }

  const newTestimonial = await Testimonial.create({
    name,
    testimonial,
  });

  if (newTestimonial) {
    res.status(201).json({
      _id: newTestimonial._id,
      name: newTestimonial.name,
      testimonial: newTestimonial.testimonial,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Testimonial data");
  }
});

// @desc    Update Testimonial
// Route    Put /api/testimonials/:id
// Access   Private
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (testimonial) {
    testimonial.name = req.body.name || testimonial.name;
    testimonial.testimonial = req.body.testimonial || testimonial.testimonial;

    const updatedTestimonial = await Testimonial.save();

    res
      .status(200)
      .json({
        success: true,
        _id: updatedTestimonial._id,
        name: updatedTestimonial.name,
        testimonial: updatedTestimonial.testimonial,
      });
  } else {
    res.status(404);
    throw new Error("Testimonial not found");
  }
});

//desc      Delete use
//route     Delete api/testimonials/:id
//access    Private
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(400);
    throw new Error("Testimonial not found");
  }

  await testimonial.deleteOne({ _id: testimonial._id });

  const testimonials = await Testimonial.find();
  res
    .status(200)
    .json({
      success: true,
      id: req.params.id,
      testimonials: testimonials,
      message: "Testimonial deleted successfully",
    });
});

export {
  getTestimonials,
  getTestimonial,
  setTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
