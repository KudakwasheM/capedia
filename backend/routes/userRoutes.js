import express from "express";
import {
  deleteUser,
  getEnterpreneurs,
  getInvestors,
  getPublishedInvestors,
  getUser,
  getUsers,
  setUser,
  toggleActivate,
  toggleSubscribe,
  updateUser,
} from "../controllers/usersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  deleteDetail,
  getDetail,
  getInvestorDetail,
  setDetail,
  updateDetail,
} from "../controllers/investorDetailsController.js";

const router = express.Router();

router.route("/investors").get(getInvestors);
router.route("/").get(getUsers).post(protect, setUser);
router.route("/enterpreneur").get(protect, getEnterpreneurs);
router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

//Investors
router.route("/investors/details").post(protect, setDetail);
router
  .route("/investors/details/:id")
  .get(protect, getDetail)
  .put(protect, updateDetail)
  .delete(protect, deleteDetail);
router.route("investors/details/:investor").get(protect, getInvestorDetail);

//Activate
router.route("/activate/:id").put(protect, toggleActivate);

//Subscribe
router.route("/subscribe/:id").put(protect, toggleSubscribe);

//Published Investors
router.route("/investors/published").get(getPublishedInvestors);

export default router;
