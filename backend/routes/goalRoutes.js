const express = require("express");
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsController");

router.get("/", getGoals).post("/", addGoal);
router.put("/:id", updateGoal).delete("/:id", deleteGoal);

module.exports = router;
