import express from "express";
import {
  deleteInvestment,
  getInvestment,
  getInvestments,
  setInvestment,
  updateInvestment,
} from "../controllers/investmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getInvestments).post(protect, setInvestment);
router
  .route("/:id")
  .get(protect, getInvestment)
  .put(protect, updateInvestment)
  .delete(protect, deleteInvestment);

export default router;
