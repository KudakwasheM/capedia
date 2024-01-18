import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  deleteDetail,
  getDetail,
  getProjectDetail,
  setDetail,
  updateDetail,
  uploadFiles,
} from "../controllers/projectDetailsController.js";

const router = express.Router();

router.route("/").post(protect, setDetail);
router
  .route("/:id")
  .get(protect, getDetail)
  .put(protect, updateDetail)
  .delete(protect, deleteDetail);
router.route("/project/:id").get(protect, getProjectDetail);
router.route("/upload/:id").post(protect, uploadFiles);

export default router;
