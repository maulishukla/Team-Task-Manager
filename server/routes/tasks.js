const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


// ================= CREATE TASK =================
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      status: "todo"
    });

    const savedTask = await task.save();

    res.json(savedTask);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
});


// ================= GET ALL TASKS =================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);

  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});


// ================= UPDATE TASK STATUS =================
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    console.log("UPDATE:", req.params.id, status);

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
});


module.exports = router;