const Expenditure = require('../models/Expenditure');

exports.createExpenditure = async (req, res) => {
    try{
        const { asset, quantity, reason, base } = req.body;
        const createdBy = req.user.id; 
        if (!asset || !quantity || !base) {
            return res.status(400).json({ error: 'Asset, quantity, and base are required' });
        }
        const expenditure = new Expenditure({
            asset,
            quantity,
            reason,
            base,
            createdBy
        });
        await expenditure.save();
        res.status(201).json({ message: 'Expenditure created successfully', expenditure });
    } catch (err) {
        console.error('Error creating expenditure:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getExpenditures = async (req, res) => {
    try {
        const expenditures = await Expenditure.find()
            .populate('asset', 'name type')
            .populate('base', 'name location')
            .populate('createdBy', 'username');
        res.json(expenditures);
    } catch (err) {
        console.error('Error fetching expenditures:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}