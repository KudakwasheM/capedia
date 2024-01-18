import asyncHandler from "express-async-handler";
import InvestorDetail from "../models/investorModel.js";
import User from "../models/userModel.js";

// @desc    Get detail on investor
// Route    Get /api/users/investors/details/:investor
// Access   Private
const getInvestorDetail = asyncHandler(async (req, res) => {
  const detail = await InvestorDetail.findOne({
    investor_id: req.params.investor,
  });

  if (!detail) {
    res.status(400);
    throw new Error("Details not found");
  }

  res.status(200).json({
    success: true,
    detail: detail,
    message: "Details found successfully",
  });
});

// @desc    Get investor details
// Route    Get /api/users/investors/details/:id
// Access   Private
const getDetail = asyncHandler(async (req, res) => {
  const details = await InvestorDetail.findById(req.params.id);

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
// Route    Post /api/users/investors/details
// Access   Private
const setDetail = asyncHandler(async (req, res) => {
  const {
    description,
    minimum,
    maximum,
    locations,
    industries,
    country,
    mobile,
    investor_id,
  } = req.body;

  if (req.body.minimum === "") {
    res.status(401);
    throw new Error("Please add minimum amount");
  } else if (req.body.description === "") {
    res.status(401);
    throw new Error("Please add description");
  } else if (req.body.maximum === "") {
    res.status(401);
    throw new Error("Please add maximum amount");
  } else if (req.body.investor_id === "") {
    res.status(401);
    throw new Error("Please add investor");
  }

  const exists = await InvestorDetail.findOne({
    investor_id: req.body.investor_id,
  });

  if (exists) {
    res.status(400);
    throw new Error("Details for this investor already exist");
  }

  try {
    const detail = await InvestorDetail.create({
      description,
      country,
      minimum,
      maximum,
      locations,
      mobile,
      industries,
      investor_id,
    });

    if (detail) {
      const project = await User.findByIdAndUpdate(
        req.body.investor_id,
        { details: detail._id },
        { new: true }
      );

      if (project) {
        res.status(201).json({
          details: detail,
          message: "Successfully added details",
        });
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error("Failed to add details");
  }
});

// @desc    Update user
// Route    Put /api/users/investors/details/:id
// Access   Private
const updateDetail = asyncHandler(async (req, res) => {
  const detail = await InvestorDetail.findById(req.params.id);

  if (detail) {
    detail.description = req.body.description || detail.description;
    detail.country = req.body.country || detail.country;
    detail.minimum = req.body.minimum || detail.minimum;
    detail.maximum = req.body.maximum || detail.maximum;
    detail.locations = req.body.locations || detail.locations;
    detail.mobile = req.body.mobile || detail.mobile;
    detail.industries = req.body.industries || detail.industries;

    const updatedDetail = await detail.save();

    res.status(200).json({
      success: true,
      details: detail,
      message: "Successfully updated details",
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
  const detail = await InvestorDetail.findById(req.params.id);

  if (!detail) {
    res.status(400);
    throw new Error("Details not found");
  }

  const investor = await User.findByIdAndUpdate(
    { _id: detail.investor_id },
    { details: null },
    { new: true }
  );

  if (investor) {
    await InvestorDetail.deleteOne({ _id: req.params.id });

    const details = await InvestorDetail.find();
    res.status(200).json({
      success: true,
      id: req.params.id,
      details: details,
      message: "Details deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Failed to delete details");
  }
});

const publishDetails = asyncHandler(async (req, res) => {
  try {
    const detail = await InvestorDetail.findById(req.params.id);

    if (!detail) {
      res.status(404).json({ message: "Investor details not found" });
    }

    detail.published = !detail.published;

    await detail.save();

    if (!detail.published) {
      res.status(200).json({
        success: true,
        message: "Successfully repudiated details",
        detail: detail,
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully published details",
      detail: detail,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to publish project");
  }
});

export {
  getInvestorDetail,
  getDetail,
  setDetail,
  updateDetail,
  deleteDetail,
  publishDetails,
};
