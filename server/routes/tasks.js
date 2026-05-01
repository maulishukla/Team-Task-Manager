const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    const task = new Task({
      title,
      projectId,
      assignedTo,
      status: "todo"
    });

    await task.save();
    res.json(task);

  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

// GET TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find()
    .populate("projectId")
    .populate("assignedTo");

  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;