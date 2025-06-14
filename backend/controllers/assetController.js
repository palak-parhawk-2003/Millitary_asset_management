const Asset = require("../models/Asset");
const Base = require("../models/Base");

exports.createAsset = async (req, res) => {
  try {
    const { name, category, unit, base } = req.body;
    const newAsset = new Asset({
      name,
      type: category,
      unit,
      createdBy: req.user.id,
    });
    await newAsset.save();
    res
      .status(201)
      .json({ message: "Asset created successfully", asset: newAsset });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
};

exports.getBases = async (req, res) => {
  try {
    const bases = await Base.find().select("_id name");
    res.status(200).json(bases);
  } catch (e) {
    console.error("Failed to fetch bases:", err);
    res.status(500).json({ message: "Internal server error", error: e.message });
  }
}