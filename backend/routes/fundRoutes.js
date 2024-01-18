import express from "express";
import {
  deleteFund,
  getFund,
  getFunds,
  setFund,
  updateFund,
} from "../controllers/fundController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getFunds).post(protect, setFund);
router
  .route("/:id")
  .get(protect, getFund)
  .put(protect, updateFund)
  .delete(protect, deleteFund);

export default router;
