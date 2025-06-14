const Transfer = require('../models/Transfer');
const Base = require("../models/Base");
const Asset = require("../models/Asset");

exports.createTransfer = async (req, res) => {
    try {
        const { asset, quantity, fromBase, toBase } = req.body;
        if(!asset || !quantity || !fromBase || !toBase) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const fromBaseModel = await Base.findOne({ name: fromBase });
        if (!fromBaseModel) return res.status(400).json({ error: "FromBase not found" });
        const toBaseModel = await Base.findOne({ name: toBase });
        if (!toBaseModel) return res.status(400).json({ error: "ToBase not found" });
        const assetModel = await Asset.findOne({ name: asset });
        if (!assetModel) return res.status(400).json({ error: "Asset not found" });
        const newTransfer = new Transfer({
            asset: assetModel._id,
            quantity,
            date: new Date(),
            fromBase: fromBaseModel._id,
            toBase: toBaseModel._id,
            createdBy: req.user.id,
        });
        await newTransfer.save();
        res.status(201).json({ message: 'Transfer created successfully', transfer: newTransfer });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
}

exports.getTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find()
            .populate('asset', 'name')
            .populate('fromBase', 'name')
            .populate('toBase', 'name')
            .populate('createdBy', 'username');
        res.status(200).json(transfers);
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};