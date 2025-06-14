const Assignment = require('../models/Assignment');
const Base = require("../models/Base");
const Asset = require("../models/Asset");
const User = require("../models/User");

exports.createAssignment = async (req, res) => {
    try {
        const { asset, quantity, base, assignedTo } = req.body;
        const createdBy = req.user.id; 
        if (!asset || !quantity || !base || !assignedTo) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const BaseModel = await Base.findOne({ name: base });
        if (!BaseModel) return res.status(400).json({ error: "Base not found" });
        const assetModel = await Asset.findOne({ name: asset });
        if (!assetModel) return res.status(400).json({ error: "Asset not found" });
        const userModel = await User.findOne({ name: assignedTo });
        if (!userModel) return res.status(400).json({ error: "User not found" });
        const assignment = new Assignment({
            asset: assetModel._id,
            quantity,
            date: new Date(),
            base: BaseModel._id,
            assignedTo: userModel._id,
            createdBy
        });
        await assignment.save();
        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (err) {
        console.error('Error creating assignment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('asset', 'name type')
            .populate('base', 'name location')
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username');
        res.status(200).json(assignments);
    } catch (err) {
        console.error('Error fetching assignments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}