const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");
const userModel = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({ user: req.user.id });
  res.status(200).json(goals);
});

const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some text");
  }
  await goalModel.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ message: "aded a goal" });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await userModel.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goalModel.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "updated a goal" });
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await userModel.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goalModel.remove(goal);
  res.status(200).json({
    message: "deleted goal",
  });
});

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
