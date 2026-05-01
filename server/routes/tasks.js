const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const task = new Task({
      title,
      status: "todo",
      projectId: projectId || null,
      assignedTo: assignedTo || null
    });

    await task.save();

    res.json({ message: "Task created", task });

  } catch (err) {
    console.error("TASK ERROR:", err);
    res.status(500).json({ message: err.message });
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