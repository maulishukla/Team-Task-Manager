const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ================= CREATE TASK =================
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { title, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      status: status || "todo",
    });

    const saved = await task.save();

    res.status(201).json(saved);

  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({ message: err.message });
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