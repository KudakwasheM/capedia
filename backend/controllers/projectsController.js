import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import ProjectDetails from "../models/projectDetailsModel.js";

// @desc        Get all projects
// Router       Get /api/projects
// Access       Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate("details")
    .populate("funds")
    .populate("members")
    // .populate("documents")
    .populate({ path: "enterpreneur", select: "-password" });

  res.status(200).json({
    success: true,
    projects: projects,
    message: "Successfully retrieved projects",
  });
});

//desc      Set project
//route     Post api/projects
//access    Private
const setProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add name");
  } else if (!req.body.industry) {
    res.status(400);
    throw new Error("Please add industry");
  } else if (!req.body.mobile) {
    res.status(400);
    throw new Error("Please add mobile");
  } else if (!req.body.location) {
    res.status(400);
    throw new Error("Please add location");
  } else if (!req.body.stage) {
    res.status(400);
    throw new Error("Please add stage");
  } else if (!req.body.expected_fund) {
    res.status(400);
    throw new Error("Please add an expected fund");
  } else if (!req.body.enterpreneur) {
    res.status(400);
    throw new Error("Please add enterpreneur");
  } else if (!req.body.investor_percentage) {
    res.status(400);
    throw new Error("Please add investor percentage");
  }

  const project = await Project.create({
    name: req.body.name,
    website: req.body.website,
    location: req.body.location,
    mobile: req.body.mobile,
    industry: req.body.industry,
    stage: req.body.stage,
    expected_fund: req.body.expected_fund,
    raised_fund: req.body.raised_fund,
    investor_percentage: req.body.investor_percentage,
    enterpreneur: req.body.enterpreneur,
  });

  res.status(201).json({
    project: project,
    message: "Successfully created project",
  });
});

//desc      Get project
//route     Get api/projects/:id
//access    public
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("details")
    .populate("funds")
    .populate("members")
    // .populate("documents")
    .populate({ path: "enterpreneur", select: "-password" });

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  res.status(200).json({
    success: true,
    project: project,
    message: "Project found successfully",
  });
});

//desc      Update project
//route     Put api/projects/:id
//access    Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    project: updatedProject,
    message: "Project updated successfully",
  });
});

//desc      Published Projects
//route     Get api/projects/published
//access    Public
const getPublishedProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({ published: true })
      .populate("details")
      .populate("funds")
      .populate("members")
      .populate({ path: "enterpreneur", select: "-password" });

    res.status(200).json({
      success: true,
      projects: projects,
      message: "Successfully retrieved projects",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes

    res.status(500).json({
      message: "Failed to retrieve projects",
      error: err.message, // Include the error message in the response
    });
  }
});

//desc      Delete project
//route     Delete api/projects/:id
//access    Private
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(400);
      throw new Error("Project not found");
    }

    const deleteProject = await ProjectDetails.deleteOne({
      project_id: project._id,
    });

    if (deleteProject) {
      await Project.deleteOne({ _id: project._id });

      const projects = await Project.find();
      res.status(200).json({
        success: true,
        id: req.params.id,
        projects: projects,
        message: "Project removed successfully",
      });
    } else {
      res.status(500).json({
        message: "Failed to delete project",
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Failed to delete project");
  }
});

const publishProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ success: false, error: "Project not found" });
    }

    project.published = !project.published;

    await project.save();

    if (!project.published) {
      res.status(200).json({
        success: true,
        message: "Successfully repudiated project",
        project: project,
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully published project",
      project: project,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to publish project");
  }
});

export {
  getProjects,
  setProject,
  getProject,
  updateProject,
  deleteProject,
  publishProject,
  getPublishedProjects,
};
