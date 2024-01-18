import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import sendEmail from "../config/sendEmail.js";
import crypto from "crypto";
import { CLIENT_RENEG_WINDOW } from "tls";

//@desc     Auth user/set token
//route     POST /api/login
//@access   Public
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        message: "Please provide both email and password",
      });
      throw new Error("Please provide both email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      throw new Error("Invalid email or password");
    }

    if (!user.active) {
      const token = await Token.findOne({
        userId: user._id,
      });

      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      res.status(401).json({
        message: "An email was sent to your account. Please verify.",
      });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      throw new Error("Invalid email or password");
    }

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      active: user.active,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login user",
    });
    throw new Error("Invalid email or password");
  }
});

// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (req.body.email === "" || req.body.password === "") {
//     res.status(401);
//     throw new Error("Fill in all fields");
//   }

//   const user = await User.findOne({ email });

//   if (!user.active) {
//     res.status(401);
//     throw new Error("User not active");
//   }

//   if (user && (await user.matchPassword(password))) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       active: user.active,
//       role: user.role,
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

//@desc     Register new user
//route     POST /api/register
//@access   Public
const register = asyncHandler(async (req, res) => {
  try {
    const { name, username, active, email, role, password } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const user = await User.create({
      name,
      username,
      email,
      active,
      role,
      password,
    });

    if (user) {
      generateToken(res, user._id);
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
  } catch (err) {
    res.status(400);
    console.log(err);
    throw new Error("Invalid user data");
  }
});

//@desc     Logout user
//route     POST /api/logout
//@access   Public
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "User logged out" });
});

//@desc     Get user profile
//route     GET /api/profile/
//@access   Private
const profile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    active: req.user.active,
    role: req.user.role,
  };
  res.status(200).json(user);
});

//@desc     Update user profile
//route     PUT /api/users/update
//@access   Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.active = req.body.active || user.active;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      _id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email,
      active: req.user.active,
      role: req.user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc     Register new user
//route     POST /api/register
//@access   Public
const registerEmail = asyncHandler(async (req, res) => {
  try {
    const { name, username, active, email, role, password } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const user = await User.create({
      name,
      username,
      email,
      active,
      role,
      password,
    });

    if (user) {
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const mail = `Good day ${user.name}, \n\nThank you for joining us at Capedia. To verify your email use the link below. \n\n${process.env.BASE_URL}/verify/account/${user._id}/${token.token}`;
      await sendEmail(user.email, "Verify Email", mail);

      res.status(201).json({
        message: "An email was sent to your account. Please verify.",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(err);
    throw new Error("Invalid user data");
  }
});

const verifyAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      return res.status(401).send({
        message: "Invalid link",
      });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(401).send({
        message: "Invalid link",
      });
    }

    await User.findByIdAndUpdate(
      { _id: user._id },
      { active: true },
      { new: true }
    );
    await token.deleteOne({ _id: token._id });

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//desc      Forgot Password
//route     Post /api/forgot-password
//access    Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();

    const mail = `Good day ${user.name}, \n\nClick the link below to reset your password. \n\nlocalhost:3000/reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Reset Password", mail);

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("An error occured");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select(
      "-password"
    );

    const { password } = req.body;

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(401).json({
        message: "Invalid link",
      });
    }

    user.password = password;

    const reset = await user.save();

    if (reset) {
      await token.deleteOne({ _id: token._id });
    }

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error("Internal Server Error");
  }
});

export {
  login,
  register,
  registerEmail,
  verifyAccount,
  logout,
  profile,
  updateUser,
  forgotPassword,
  resetPassword,
};
