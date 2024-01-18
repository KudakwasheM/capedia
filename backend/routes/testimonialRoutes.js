import express from "express";
import {
  deleteTestimonial,
  getTestimonial,
  getTestimonials,
  setTestimonial,
  updateTestimonial,
} from "../controllers/testimonialController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTestimonials).post(protect, setTestimonial);
router
  .route("/:id")
  .get(getTestimonial)
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;
