const express = require("express");
const router = express.Router();
const { createAsset, getAssets, getBases } = require("../controllers/assetController");
const { verifyToken, allowRoles } = require("../middlewares/auth");

router.post("/", verifyToken, createAsset);
router.get("/", verifyToken, getAssets);
router.get("/bases", verifyToken, getBases);

module.exports = router;
