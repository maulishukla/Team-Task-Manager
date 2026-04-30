const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// CREATE PROJECT (ADMIN ONLY)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin allowed" });
  }

  const project = await Project.create({
    ...req.body,
    createdBy: req.user.userId
  });

  res.json(project);
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;