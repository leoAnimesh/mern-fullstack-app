const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find();
  res.status(200).json(goals);
});

const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some text");
  }
  await goalModel.create({
    text: req.body.text,
  });
  res.status(200).json({ message: "aded a goal" });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
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

  await goalModel.remove(goal);
  res.status(200).json({
    message: "deleted goal",
  });
});

module.exports = {
  getGoals,
  addGoal,
  deleteGoal,
  updateGoal,
};
