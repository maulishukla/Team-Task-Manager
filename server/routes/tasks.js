const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE TASK (ULTRA SIMPLE)
router.post("/", async (req, res) => {
  try {
    console.log("REQ:", req.body);

    const task = new Task({
      title: req.body.title,
      status: "todo"
    });

    await task.save();

    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Task creation failed" });
  }
});

// GET TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;