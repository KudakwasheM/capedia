import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get users
// Route    Get /api/users
// Access   Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res
    .status(200)
    .json({ success: true, message: "Users found successfully", users: users });
});

// @desc    Get users
// Route    Get /api/users/enterpreneur
// Access   Private
const getEnterpreneurs = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "Enterpreneur" });

    res.status(200).json({
      success: true,
      message: "Enterpreneurs found successfully",
      users: users,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to get enterpreneurs");
  }
});

// @desc    Get users
// Route    Get /api/users/investors
// Access   Private
const getInvestors = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "Investor" }).populate("details");

    res.status(200).json({
      success: true,
      message: "Investors found successfully",
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
    // throw new Error("Failed to get enterpreneurs");
  }
});

// @desc    Get users
// Route    Get /api/users/investors/published
// Access   Public
const getPublishedInvestors = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: "Investor" }).populate("details");

    const published = users.filter((u) => u.details && u.details.published);

    res.status(200).json({
      success: true,
      message: "Investors found successfully",
      users: published,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    throw new Error("Failed to get enterpreneurs");
  }
});

// @desc    Get user
// Route    Get /api/users/:id
// Access   Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("details");

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    user: user,
    message: "User found successfully",
  });
});

// @desc    Set user
// Route    Post /api/users
// Access   Private
const setUser = asyncHandler(async (req, res) => {
  const { name, username, active, email, role, password } = req.body;

  if (
    req.body.name === "" ||
    req.body.username === "" ||
    req.body.role === "" ||
    req.body.password === "" ||
    req.body.email === ""
  ) {
    res.status(401);
    throw new Error("Fill in all fields");
  }

  const emailExist = await User.findOne({ email });
  const usernameExist = await User.findOne({ username });

  if (emailExist) {
    res.status(400);
    throw new Error("Email already exists");
  } else if (usernameExist) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    active,
    subscribed: false,
    role,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      active: user.active,
      subscribed: user.subscribed,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update user
// Route    Put /api/users/:id
// Access   Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.active = req.body.active || user.active;
    user.role = req.body.role || user.role;
    user.subscribed = req.body.subscribed || user.subscribed;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      active: updatedUser.active,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const toggleActivate = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    user.active = !user.active;
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Failed to activate user");
  }
});

const toggleSubscribe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    user.subscribed = !user.subscribed;
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Failed to activate user");
  }
});

//desc      Delete use
//route     Delete api/users/:id
//access    Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: user._id });

  const users = await User.find();
  res.status(200).json({
    success: true,
    id: req.params.id,
    users: users,
    message: "Users deleted successfully",
  });
});

export {
  getUsers,
  getEnterpreneurs,
  getInvestors,
  getPublishedInvestors,
  getUser,
  setUser,
  updateUser,
  toggleActivate,
  toggleSubscribe,
  deleteUser,
};
