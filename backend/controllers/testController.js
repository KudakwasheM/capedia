import asyncHandler from "express-async-handler";
import fs from "fs";
import Test from "../models/testModel.js";
import Datauri from "datauri";
import path from "path";
import fileUploader from "../middlewares/fileUploadMiddleware.js";
// import { Grid } from "gridfs-stream";
import mongoose from "mongoose";

const uploadConvert = asyncHandler(async (req, res) => {});

const toBase64 = (filepath) => {
  const file = fs.readFileSync(filepath);

  return Buffer.from(file).toString("base64");
};

const saveFileToDB = asyncHandler(async (req, res) => {
  const auth = req.user._id;

  const basePath = `./backend/public/test/${auth}`;
  try {
    const file = req.files.file;

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    } else {
      const files = fs.readdirSync(basePath);

      for (const file of files) {
        fs.unlinkSync(path.join(basePath, file));
      }
    }

    const filePath = path.join(basePath, file.name);

    await file.mv(filePath);

    const base64Data = toBase64(filePath);

    const newFile = await Test.create({
      data: base64Data,
      filename: `${Date.now()}_${file.name}`,
      mimetype: file.mimetype,
    });

    res
      .status(200)
      .json({ success: true, file: newFile, message: "File saved to MongoDB" });
  } catch (err) {
    res.status(500);
    throw new Error("Error saving file to MongoDB:", err);
  }
});

// Function to retrieve a file from MongoDB by its filename
const retrieveFileFromDB = async (filename) => {
  try {
    const file = await File.findOne({ filename });

    if (!file) {
      throw new Error("File not found");
    }

    const fileData = Buffer.from(file.data, "base64");

    // Write the file data to a desired location
    fs.writeFileSync(`./downloads/${file.filename}`, fileData);

    console.log("File retrieved from MongoDB");
  } catch (err) {
    console.error("Error retrieving file from MongoDB:", err);
  }
};

const saveFileToMongo = asyncHandler(async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.send("Please select file");
    }

    return res.status(200).json({
      message: "File has been uploaded.",
    });
  } catch (err) {
    console.log(err);

    return res.send({
      message: `Error when trying upload image: ${err}`,
    });
  }
});

// const downloadFile = asyncHandler(async (req, res) => {
//   let gfs;
//   conn.once("open", () => {
//     gfs = new mongoose.mongo.GridFSBucket();
//   });
//   const file = gfs
//     .find({ filename: "1703061428700_sites.txt" })
//     .toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(404).json({
//           message: "no files found",
//         });
//       }
//       gfs.openDownloadStreamByName("1703061428700_sites.txt").pipe(res);
//     });
// });

export { saveFileToDB, saveFileToMongo };
