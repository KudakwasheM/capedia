import asyncHandler from "express-async-handler";
import ProjectDetails from "../models/projectDetailsModel.js";
import Project from "../models/projectModel.js";
import fs from "fs";
import path, { basename } from "path";

// @desc    Get detail on project
// Route    Get /api/details/project/:id
// Access   Private
const getProjectDetail = asyncHandler(async (req, res) => {
  try {
    const detail = await ProjectDetails.findOne({ project_id: req.params.id });
    if (!detail) {
      res.status(400);
      throw new Error("Details not found");
    }
    res.status(200).json({
      success: true,
      detail: detail,
      message: "Details found successfully",
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Server error");
  }
});

// @desc    Get detail
// Route    Get /api/details/:id
// Access   Private
const getDetail = asyncHandler(async (req, res) => {
  const details = await ProjectDetails.findById(req.params.id);

  if (!details) {
    res.status(400);
    throw new Error("Details not found");
  }

  res.status(200).json({
    success: true,
    details: details,
    message: "Details found successfully",
  });
});

// @desc    Set detail
// Route    Post /api/details
// Access   Private
const setDetail = asyncHandler(async (req, res) => {
  const { short_summary, description, progress, advantages, deal, project_id } =
    req.body;

  if (!short_summary) {
    res.status(401);
    throw new Error("Please add short summary");
  } else if (!description) {
    res.status(401);
    throw new Error("Please add description");
  } else if (!deal) {
    res.status(401);
    throw new Error("Please add deal");
  } else if (!project_id) {
    res.status(401);
    throw new Error("Please add project");
  }

  const exists = await ProjectDetails.findOne({
    project_id: req.body.project_id,
  });

  if (exists) {
    res.status(400);
    throw new Error("Details for this proposal already exist");
  }

  try {
    const detail = await ProjectDetails.create({
      short_summary,
      description,
      progress,
      advantages,
      deal,
      project_id,
    });

    if (detail) {
      const project = await Project.findByIdAndUpdate(
        req.body.project_id,
        { details: detail._id },
        { new: true }
      );

      if (project) {
        res.status(201).json({
          id: detail._id,
          short_summary: detail.short_summary,
          description: detail.description,
          progress: detail.progress,
          email: detail.email,
          advantages: detail.advantages,
          deal: detail.deal,
          project_id: detail.project_id,
        });
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error("Failed to add details");
  }
});

const uploadFiles = asyncHandler(async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400);
      throw new Error("No files were uploaded");
    }
    const basePath = `./backend/public/projects/${req.params.id}`;

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    // Assuming you have a form field named "files[]" for multiple file uploads
    const files = req.files.files;

    // Process each uploaded file
    const uploadedFiles = [];
    for (const file of files) {
      // Generate a unique filename or use the original filename
      const fileName = `${Date.now()}_${file.name}`;

      const filePath = path.join(basePath, fileName);
      // Move the file to a designated storage location
      await file.mv(filePath);

      uploadedFiles.push({
        filename: fileName,
        originalname: file.name,
        mimetype: file.mimetype,
        size: file.size,
      });
    }

    res.status(200).json({
      success: true,
      files: uploadedFiles,
      message: "Files uploaded successfully",
    });
  } catch (err) {
    console.error("Error uploading files: ", err);
    res.status(500).json({
      message: "Failed to upload files",
    });
  }
});

// @desc    Update user
// Route    Put /api/users/:id
// Access   Private
const updateDetail = asyncHandler(async (req, res) => {
  const detail = await ProjectDetails.findById(req.params.id);

  if (detail) {
    detail.short_summary = req.body.short_summary || detail.short_summary;
    detail.description = req.body.description || detail.description;
    detail.progress = req.body.progress || detail.progress;
    detail.advantages = req.body.advantages || detail.advantages;
    detail.deal = req.body.deal || detail.deal;

    const updatedDetail = await detail.save();

    res.status(200).json({
      success: true,
      id: updatedDetail._id,
      short_summary: updatedDetail.short_summary,
      description: updatedDetail.description,
      progress: updatedDetail.progress,
      advantages: updatedDetail.advantages,
      deal: updatedDetail.deal,
    });
  } else {
    res.status(404);
    throw new Error("Details not found");
  }
});

//desc      Delete detail
//route     Delete api/details/:id
//access    Private
const deleteDetail = asyncHandler(async (req, res) => {
  const detail = await ProjectDetails.findById(req.params.id);

  if (!detail) {
    res.status(400);
    throw new Error("Project details not found");
  }

  const project = await Project.findById({ _id: detail.project_id });
  if (!project) {
    res.status(400).json({
      message: "Project not found",
    });
    throw new Error("Project not found");
  }

  const removeDetail = await Project.findByIdAndUpdate(
    detail.project_id,
    { details: null },
    { new: true }
  );

  if (!removeDetail) {
    res.status(500).json({
      message: "Failed to remove detail",
    });
    throw new Error("Failed to remove detail");
  }

  await ProjectDetails.deleteOne({ _id: detail._id });

  const details = await ProjectDetails.find();
  res.status(200).json({
    success: true,
    id: req.params.id,
    details: details,
    message: "Details deleted successfully",
  });
});

export {
  getProjectDetail,
  getDetail,
  uploadFiles,
  setDetail,
  updateDetail,
  deleteDetail,
};
