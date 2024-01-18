import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  deleteMember,
  getMember,
  getTeamMembers,
  setMember,
  updateMember,
} from "../controllers/teamMemberController.js";

const router = express.Router();

router.route("/").post(protect, setMember);
router
  .route("/:id")
  .get(protect, getMember)
  .put(protect, updateMember)
  .delete(protect, deleteMember);
router.route("/project/:project").get(protect, getTeamMembers);

export default router;
