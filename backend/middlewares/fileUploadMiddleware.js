import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import util from "util";

const storage = new GridFsStorage({
  url: "mongodb+srv://netoprojects:Neto1012@netocluster.yifesqp.mongodb.net/middle?retryWrites=true&w=majority",
  file: (req, file) => {
    const filename = `${Date.now()}_${file.originalname}`;

    return {
      bucketName: "files",
      filename: filename,
    };
  },
});

const upload = multer({ storage: storage }).single("file");

const fileUploader = util.promisify(upload);

export default fileUploader;
