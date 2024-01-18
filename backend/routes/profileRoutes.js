import express from "express";
import { fileReading, setProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import mongoose from "mongoose";

const router = express.Router();

const mongoUri =
  "mongodb+srv://netoprojects:Neto1012@netocluster.yifesqp.mongodb.net/middle?retryWrites=true&w=majority";

// const conn = mongoose
//   .connect(mongoUri)
//   .then(() => console.log("connected"))
//   .catch((e) => console.log(e));

const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    // const reqBody = JSON.parse(JSON.stringify(req.body));
    const filename = `${Date.now()}_${file.originalname}`;
    return {
      filename: filename,
      metadata: {
        user_id: req.user._id,
      },
      bucketName: "profiles",
    };
  },
});

const upload = multer({ storage });

router.route("/").post(protect, upload.single("profile"), setProfile);
router.route("/profile").get(protect, fileReading);

export default router;
