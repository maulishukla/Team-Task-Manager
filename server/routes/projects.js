const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.post("/", async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name
    });

    await project.save();
    res.json(project);
  } catch {
    res.status(500).json({ message: "Error creating project" });
  }
});

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;