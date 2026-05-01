console.log("SERVER BOOTING...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API Running");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

// 🔥 Fail fast if Mongo is wrong
(async () => {
  try {
    console.log("Connecting to Mongo...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // don't hang forever
    });
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Mongo connection FAILED:", err.message);
    process.exit(1); // crash clearly so logs show error
  }
})();