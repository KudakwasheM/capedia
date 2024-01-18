import asyncHandler from "express-async-handler";
import TeamMember from "../models/teamMember.js";
import Project from "../models/projectModel.js";

// @desc    Get members on project
// Route    Get /api/members/project/:id
// Access   Private
const getTeamMembers = asyncHandler(async (req, res) => {
  const members = await TeamMember.find({ project_id: req.params.project });

  if (!members) {
    res.status(400);
    throw new Error("Members not found");
  }

  res
    .status(200)
    .json({
      success: true,
      members: members,
      message: "Team members found successfully",
    });
});

// @desc    Get detail on project
// Route    Get /api/members/:id
// Access   Private
const getMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found");
  }

  res
    .status(200)
    .json({
      success: true,
      member: member,
      message: "Member found successfully",
    });
});

// @desc    Set member
// Route    Post /api/members
// Access   Private
const setMember = asyncHandler(async (req, res) => {
  const { name, position, description, project_id } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Please add name");
  } else if (!position) {
    res.status(401);
    throw new Error("Please add position");
  } else if (!description) {
    res.status(401);
    throw new Error("Please add description");
  } else if (!project_id) {
    res.status(401);
    throw new Error("Please add project");
  }

  try {
    const member = await TeamMember.create({
      name,
      position,
      description,
      project_id,
    });

    if (member) {
      const project = await Project.findByIdAndUpdate(
        req.body.project_id,
        {
          $push: { members: member._id },
        },
        { new: true }
      );

      if (project) {
        res.status(201).json({
          member: member,
          message: "Successfully added a member",
        });
      } else {
        throw new Error("Failed to update project with member");
      }
    }
  } catch (err) {
    res.status(400);
    throw new Error("Failed to add member");
  }
});

// @desc    Update member
// Route    Put /api/member/:id
// Access   Private
const updateMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (member) {
    member.name = req.body.name || member.name;
    member.description = req.body.description || member.description;
    member.position = req.body.position || member.position;

    const updatedMember = await member.save();

    res
      .status(200)
      .json({
        success: true,
        name: updatedMember.name,
        description: updatedMember.description,
        position: updatedMember.position,
      });
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
});

//desc      Delete member
//route     Delete api/members/:id
//access    Private
const deleteMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("User not found");
  }

  const project = await Project.findById(member.project_id);

  const memberIndex = project.members.indexOf(member._id);
  if (memberIndex > -1) {
    project.members.splice(memberIndex, 1);
  }

  await project.save();

  await TeamMember.deleteOne({ _id: member._id });

  const members = await TeamMember.find();
  res
    .status(200)
    .json({
      success: true,
      id: req.params.id,
      members: members,
      message: "Team member deleted successfully",
    });
});

export { getTeamMembers, setMember, getMember, updateMember, deleteMember };
