import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProjectDocument,
  deleteProjectDocument,
  getProjectDocuments,
  setProjectDocuments,
  showfile,
} from "../controllers/projectDocumentController.js";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const router = express.Router();

const mongoUri =
  "mongodb+srv://netoprojects:Neto1012@netocluster.yifesqp.mongodb.net/middle?retryWrites=true&w=majority";

const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          metadata: {
            project_id: req.params.project,
          },
          bucketName: "docsets",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.route("/project/:project").get(protect, getProjectDocuments);
router
  .route("/:project/project")
  .post(protect, upload.single("document"), setProjectDocuments);
router.route("/:id").delete(protect, deleteProjectDocument);
router.route("/project/create/:project").post(protect, createProjectDocument);
router.route("/project/:project_id/:filename").get(protect, showfile);

export default router;
