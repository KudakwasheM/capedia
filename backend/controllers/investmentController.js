import asyncHandler from "express-async-handler";
import Investment from "../models/investmentModel.js";

// @desc    Get investments
// Route    Get /api/investments
// Access   Private
const getInvestments = asyncHandler(async (req, res) => {
  const investments = await Investment.find();

  res
    .status(200)
    .json({
      success: true,
      investments: investments,
      message: "Successfully retrieved investments",
    });
});

// @desc    Get investments
// Route    Get /api/investments
// Access   Private
const setInvestment = asyncHandler(async (req, res) => {
  if (!req.body.amount) {
    res.status(400);
    throw new Error("Please add amount field");
  } else if (!req.body.investor) {
    res.status(400);
    throw new Error("Please add investor field");
  }

  const investment = await Investment.find({
    name: req.body.amount,
    remaining: req.body.amount,
    investor: req.body.investor,
    project_types: req.body.project_types,
  });

  res.status(201).json({
    investment: investment,
    message: "Successfully created project",
  });
});

const getInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  res
    .status(200)
    .json({
      success: true,
      investment: investment,
      message: "Investment found successfully",
    });
});

const updateInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);

  if (!investment) {
    res.status(400);
    throw new Error("Investment not found");
  }

  investment.amount = req.body.amount || investment.amount;
  investment;
  investment.remaining = req.body.remaining || investment.remaining;
  investment.project_types = req.body.project_types || investment.project_types;

  const updatedInvestment = await investment.save();

  res
    .status(200)
    .json({
      success: true,
      id: updatedInvestment._id,
      amount: updateInvestment.amount,
      remaining: updateInvestment.remaining,
      project_types: updateInvestment.project_types,
    });
});

const deleteInvestment = asyncHandler(async (req, res) => {
  const investment = await Investment.findById(req.params.id);
  if (!investment) {
    res.status(400);
    throw new Error("investment not found");
  }

  await Investment.deleteOne({ _id: investment._id });

  const investments = await Investment.find();
  res
    .status(200)
    .json({
      success: true,
      id: req.params.id,
      investments: investments,
      message: "Investment removed successfully",
    });
});

export {
  getInvestments,
  setInvestment,
  getInvestment,
  updateInvestment,
  deleteInvestment,
};
