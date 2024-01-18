import express from "express";
import {
  deleteProject,
  getProject,
  getProjects,
  getPublishedProjects,
  publishProject,
  setProject,
  updateProject,
} from "../controllers/projectsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, setProject);
router
  .route("/:id")
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);
router.route("/:id/publish").put(protect, publishProject);
router.route("/all/published").get(getPublishedProjects);

export default router;
