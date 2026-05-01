const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ================= CREATE TASK =================
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const task = new Task({
      title: req.body.title,
      status: "todo"
    });

    await task.save();

    res.json({ message: "Task created successfully" });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Error creating task" });
  }
});

// ================= GET TASKS =================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= UPDATE TASK =================
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;