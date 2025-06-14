const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);

module.exports = router;
