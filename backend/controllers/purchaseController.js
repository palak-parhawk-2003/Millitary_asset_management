const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
    try {
        const newPurchase = new Purchase({ ...req.body, createby: req.user.id });
        await newPurchase.save();
        res.status(201).json({ message: 'Purchase created successfully', purchase: newPurchase });
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};

exports.getPurchases = async (req, res) => {
    try {
        const { base, asset, date } = req.query;
        const filter = {};
        if(base) filter.base = base;
        if(asset) filter.asset = asset;
        if(date) filter.date = { $gte: new Date(date) };
        const purchases = await Purchase.find(filter).populate('asset base createby');
        res.status(200).json(purchases);
    } catch (e) {
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};