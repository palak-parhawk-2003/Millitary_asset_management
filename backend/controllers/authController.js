const User = require("../models/User");
const Base = require("../models/Base");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, base } = req.body;

    if (!name || !email || !password || !role || !base) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const baseModel = await Base.findOne({ name: base });
    if (!baseModel) return res.status(400).json({ error: "Base not found" });

    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      base: baseModel._id,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

exports.login = async (req, res) => {
  console.log("login called");
  try {
    const { email, password } = req.body;
    // Finding the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Comparing the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generating JWT token
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, role: user.role, baseId: user.base?._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

// GET /api/user/me
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ status: "success", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
