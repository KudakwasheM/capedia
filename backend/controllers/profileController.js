import UserProfile from "../models/userProfileModel.js";
import asyncHandler from "express-async-handler";
import path, { basename } from "path";
import { URL } from "url";
import fs from "fs";

// const saveProfile = asyncHandler(async (req, res) => {
//   const profile = req.files.image;
//   const auth = req.user._id;

//   const basePath = `./backend/public/profiles/${auth}`;

//   try {
//     if (!fs.existsSync(basePath)) {
//       fs.mkdirSync(basePath, { recursive: true });
//     } else {
//       const files = fs.readdirSync(basePath);

//       for (const file of files) {
//         fs.unlinkSync(path.join(basePath, file));
//       }
//     }

//     const imagePath = path.join(basePath, profile.name);

//     await profile.mv(imagePath);

//     if (fs.existsSync(imagePath)) {
//       let userDP = await UserProfile.findOne({ user_id: auth });

//       if (!userDP) {
//         userDP = await UserProfile.create({
//           image: imagePath,
//           path: basePath + `/${profile.name}`,
//           user_id: auth,
//         });
//       } else {
//         userDP.image = imagePath;
//         userDP.path = basePath + `/${profile.name}`;
//         await userDP.save();
//       }

//       res
//         .status(200)
//         .json({
//           success: true,
//           profile: userDP,
//           message: "Profile uploaded successfully",
//         });
//     } else {
//       throw new Error("Failed to move the file");
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to upload profile",
//     });
//     throw new Error("Failed to upload file");
//   }
// });

const setProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { profileUrl } = req.body;
  if (userId === "") {
    res.status(400).json({
      success: false,
      message: "No user found",
    });
  }

  if (req.file == undefined) {
    return res.status(400).json({
      success: false,
      message: "Failed to upload profile",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile uploaded successfully",
  });
});

// const saveProfile = asyncHandler(async (req, res) => {
//   try {
//     const profile = req.files.image;
//     const user_id = req.user._id;

//     const basePath = `./backend/public/profiles/${user_id}`;

//     if (!fs.existsSync(basePath)) {
//       fs.mkdirSync(basePath, { recursive: true });

//       const imagePath = path.join(basePath, profile.name);

//       await profile.mv(imagePath);

//       // const userDP = await UserProfile.create({
//       //   image: imagePath,
//       //   path: `/profiles/${profile.name}`,
//       //   user_id: user_id,
//       // });

//       // res.status(200).json({ success:true,
//       //   profile: userDP,
//       //   message: "Profile uploaded successfully",
//       // });
//       console.log("Uploaded");

//       res.send("File uploaded successfully");
//     } else {
//       const files = fs.readdirSync(basePath);

//       for (const file of files) {
//         fs.unlinkSync(path.join(basePath, file));
//       }

//       const imagePath = path.join(basePath, profile.name);

//       await profile.mv(imagePath);

//       // const userDP = await UserProfile.create({
//       //   image: imagePath,
//       //   path: `/profiles/${profile.name}`,
//       //   user_id: user_id,
//       // });

//       // res.status(200).json({ success:true,
//       //   profile: userDP,
//       //   message: "Profile uploaded successfully",
//       // });
//       console.log("Uploaded");

//       res.send("File uploaded successfully");
//     }
//   } catch (err) {
//     console.log("There is an error", err);
//     res.status(500).json({
//       message: "Failed to upload profile",
//     });
//   }
// });

const fileReading = asyncHandler(async (req, res) => {
  // const fileI = fs.createReadStream("/profiles/CEST3574.JPG");
  fs.createReadStream("../middle/backend/public/profiles/CEST3574.JPG").pipe(
    res
  );
});

const deleteProfile = asyncHandler(async () => {});

export { setProfile, fileReading };
