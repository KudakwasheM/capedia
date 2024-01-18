import express from "express";
import {
  saveFileToDB,
  saveFileToMongo,
} from "../controllers/testController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const router = express.Router();

const storage = new GridFsStorage({
  url: `mongodb+srv://netoprojects:Neto1012@netocluster.yifesqp.mongodb.net/middle?retryWrites=true&w=majority`,
  file: (req, file) => {
    const filename = `${Date.now()}_${file.originalname}`;
    return {
      filename: filename,
      bucketName: "files",
    };
  },
});

const upload = multer({ storage });

router.route("/").post(protect, saveFileToDB);
router.post("/send-file", upload.single("file"), saveFileToMongo);
// router.route("/send-file").post(saveFileToMongo);

export default router;
