import asyncHandler from "express-async-handler";
import Fund from "../models/fundModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

// @desc        Get all funds
// Router       Get /api/funds
// Access       Private
const getFunds = asyncHandler(async (req, res) => {
  const funds = await Fund.find()
    .populate({ path: "investor", select: "-password" })
    .populate("project");

  res
    .status(200)
    .json({
      success: true,
      funds: funds,
      message: "Successfully retrieved funds",
    });
});

//desc      Set fund
//route     Post api/funds
//access    Private
const setFund = asyncHandler(async (req, res) => {
  try {
    const { amount, investor, project } = req.body;

    if (!amount) {
      res.status(400);
      throw new Error("Please add amount");
    } else if (!investor) {
      res.status(400);
      throw new Error("Please add investor");
    } else if (!project) {
      res.status(400);
      throw new Error("Please add project");
    }

    const investorFound = User.findById(req.body.investor);
    const projectFound = Project.findById(req.body.project);

    if (!investorFound) {
      res.status(400);
      throw new Error("Investor not found");
    }

    if (!projectFound) {
      res.status(400);
      throw new Error("Project not found");
    }

    const fund = await Fund.create({
      amount: req.body.amount,
      investor: req.body.investor,
      project: req.body.project,
    });

    if (fund) {
      const project = await Project.findByIdAndUpdate(
        req.body.project,
        {
          $push: { funds: fund._id },
        },
        { new: true }
      );

      const isInvestorInProject = project.investors.includes(fund.investor);
      if (!isInvestorInProject) {
        project.investors.push(fund.investor);
      }

      project.raised_fund = project.raised_fund + fund.amount;
      await project.save();

      if (project) {
        fund.project_percentage =
          Number(fund.amount) / Number(project.expected_fund);
        await fund.save();

        res.status(201).json({
          fund: fund,
          project: project,
          message: "Successfully created fund",
        });
      }
    }
  } catch (err) {
    res.status(401);
    throw new Error("Failed to add fund");
  }
});

//desc      Get fund
//route     Get api/funds/:id
//access    Private
const getFund = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id)
    .populate("investor")
    .populate("project");

  if (!fund) {
    res.status(400);
    throw new Error("Fund not found");
  }

  res
    .status(200)
    .json({ success: true, fund: fund, message: "Fund found successfully" });
});

//desc      Update fund
//route     Put api/funds/:id
//access    Private
const updateFund = asyncHandler(async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);

    if (!fund) {
      res.status(400);
      throw new Error("Fund not found");
    }

    if (req.body.amount) {
      const fundProject = await Project.findById(fund.project);

      const previous = fundProject.raised_fund - fund.amount;
      fundProject.raised_fund = Number(previous) + Number(req.body.amount);
      await fundProject.save();
      fund.project_percentage =
        Number(fund.amount) / Number(fundProject.expected_fund);
    }

    fund.amount = req.body.amount || fund.amount;
    fund.investor = req.body.investor || fund.investor;
    fund.project = req.body.project || fund.project;

    const updatedFund = await fund.save();

    res
      .status(200)
      .json({
        success: true,
        fund: updatedFund,
        message: "Fund updated successfully",
      });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to update fund");
  }
});

//desc      Delete fund
//route     Delete api/funds/:id
//access    Private
const deleteFund = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  if (!fund) {
    res.status(400);
    throw new Error("Fund not found");
  }

  try {
    const fundProject = await Project.findById(fund.project);
    if (!fundProject) {
      res.status(400);
      throw new Error("Project not found");
    }
    const previous = Number(fundProject.raised_fund) - Number(fund.amount);
    fundProject.raised_fund = previous;

    const fundIndex = fundProject.funds.indexOf(fund._id);
    if (fundIndex > -1) {
      fundProject.funds.splice(fundIndex, 1);
    }

    await fundProject.save();

    await Fund.deleteOne({ _id: fund._id });
    const otherFunds = await Fund.findOne({
      investor: fund.investor,
      project: fundProject._id,
    });

    if (!otherFunds) {
      // Remove the investor ID from the project's investors array
      const investorIndex = fundProject.investors.indexOf(fund.investor);
      if (investorIndex > -1) {
        fundProject.investors.splice(investorIndex, 1);
      }
    }
    await fundProject.save();

    const funds = await Fund.find();
    res
      .status(200)
      .json({
        success: true,
        id: req.params.id,
        funds: funds,
        project: fundProject,
        message: "Fund removed successfully",
      });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to remove fund");
  }
});

export { getFunds, setFund, getFund, updateFund, deleteFund };
