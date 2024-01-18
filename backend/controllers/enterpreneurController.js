import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Fund from "../models/fundModel.js";

const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = User.findById(req.params.id);

    res
      .status(200)
      .json({ success: true, user: user, message: "User found successfully" });
  } catch (err) {
    res.status(500);
    throw new Error(err?.message || "Failed to find user");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      res.status(400);
      throw new Error("Old password is wrong");
    }

    user.password = newPassword;

    const updatedUser = await user.save();
    res
      .status(200)
      .json({
        success: true,
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        active: updatedUser.active,
        role: updatedUser.role,
        message: "Successfully updated password",
      });
  } catch (err) {
    res.status(500);
    throw new Error(err?.message || "Failed to change password");
  }
});

const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      enterpreneur: req.params.user,
    })
      .populate({ path: "investors", select: "-password" })
      .populate("details");

    res
      .status(200)
      .json({
        success: true,
        message: "Retrieved projects successfully",
        projects: projects,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
    throw new Error("An error occured");
  }
});

const getInvestors = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      enterpreneur: req.params.user,
    }).populate({ path: "investors", select: "-password" });
    const investors = projects.flatMap((project) => project.investors);

    res
      .status(200)
      .json({
        success: true,
        message: "Investors retrieved successfully",
        investors: investors,
      });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
    throw new Error("Internal server error");
  }
});

const getFunds = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      enterpreneur: req.params.user,
    });
    let fundsArray = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].funds.length > 0) {
        for (let j = 0; j < projects[i].funds.length; j++) {
          const projectFund = await Fund.findById({
            _id: projects[i].funds[j],
          })
            .populate("project")
            .populate({ path: "investor", select: "-password" });

          fundsArray.push(projectFund);
        }
      }
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Funds found successfully",
        funds: fundsArray,
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    throw new Error("Internal server error");
  }
});

export { getProjects, getProfile, changePassword, getInvestors, getFunds };
