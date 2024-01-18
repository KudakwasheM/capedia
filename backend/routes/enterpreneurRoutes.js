import express from "express";
import {
  changePassword,
  getFunds,
  getInvestors,
  getProfile,
  getProjects,
} from "../controllers/enterpreneurController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:id").get(protect, getProfile);
router.route("/").put(protect, changePassword);
router.route("/:user/projects").get(getProjects);
router.route("/:user/investors").get(getInvestors);
router.route("/:user/funds").get(getFunds);

export default router;
