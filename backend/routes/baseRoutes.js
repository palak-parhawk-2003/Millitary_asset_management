const express = require("express");
const router = express.Router();
const Base = require("../models/Base");

router.get("/names", async (req, res) => {
  try {
    const baseNames = await Base.find({}, "name");
    res.json(baseNames);
  } catch (error) {
    console.error("Error fetching base names:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;