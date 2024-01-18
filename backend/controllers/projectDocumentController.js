import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import fs from "fs";
import path from "path";
import Document from "../models/projectDocumentModel.js";
import FileReader from "filereader";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

const mongoUri =
  "mongodb+srv://netoprojects:Neto1012@netocluster.yifesqp.mongodb.net/middle?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoUri);
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("docsets");
});

const getProjectDocuments = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.project);

  if (!project) {
    res.status(404).json({ message: "Project not found" });
    throw new Error("Project not found");
  }

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "docsets",
  });

  const docs = bucket
    .find({ "metadata.project_id": req.params.project })
    .toArray(); // Convert to array

  const files = await docs; // Await the conversion to array

  if (!files || files.length === 0) {
    return res.status(200).json({
      success: false,
      message: "No files found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Files found successfully",
    files: files,
  });
});

const showfile = async (req, res) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "docsets",
  });

  res.type("application/pdf");
  bucket.open;
  bucket.openDownloadStreamByName(req.params.filename).pipe(res);
};

const setProjectDocuments = asyncHandler(async (req, res) => {
  try {
    const { filename } = req.body;
    const project_id = req.params.project;

    if (project_id === "") {
      res.status(401).json({
        message: "Please provide project id",
      });
      throw new Error("Please provide project id");
    }
    if (filename === "") {
      res.status(401).json({
        message: "Please provide filename",
      });
      throw new Error("Please provide filename");
    }

    if (req.file == undefined) {
      return res.status(400).json({
        success: false,
        message: "Please add file",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.send("Failed");
    throw new Error("Please provide filename");
  }
});

const getProjectDetails = asyncHandler(async (req, res) => {
  try {
    gfs.files
      .find({ "metadata.project_id": req.params.project })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "No files found",
          });
        }

        res.status(200).json({
          success: true,
          message: "Files found successfully",
          files: files,
        });
      });
  } catch (error) {}
});

const createProjectDocument = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.project);

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }
    const { title, data, mimetype } = req.body;

    const documentName = `${title}_${project.name}`;

    const newDocument = await Document.create({
      title,
      data,
      filename: documentName,
      mimetype,
      project_id: project._id,
    });

    const addDoc = await Project.findByIdAndUpdate(
      req.params.project,
      {
        $push: { documents: newDocument._id },
      },
      { new: true }
    );

    if (!addDoc || !data || !newDocument) {
      const documentIndex = project.documents.indexOf(document._id);
      if (documentIndex > -1) {
        project.documents.splice(documentIndex, 1);
      }
      await project.save();

      await document.deleteOne({ _id: document._id });
      res.status(500).json({ message: "Failed to save document" });
    }

    res.status(200).json({
      documents: newDocument,
      message: "Document uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error");
  }
});

const deleteProjectDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404).json({
      success: false,
      message: "Document not found",
    });
  }

  try {
    const project = await Project.findById(document.project_id);

    const documentIndex = project.documents.indexOf(document._id);

    if (documentIndex > -1) {
      project.documents.splice(documentIndex, 1);
    }

    await project.save();

    await document.deleteOne({ _id: document._id });

    const otherDocuments = await Document.find({
      project_id: project._id,
    });

    res.status(200).json({
      success: true,
      message: "Deleted document successfully",
      documents: otherDocuments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    throw new Error("Internal server error");
  }
});

export {
  getProjectDocuments,
  setProjectDocuments,
  deleteProjectDocument,
  createProjectDocument,
  showfile,
};
