const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    quantity: { type: Number, required: true },
    reason: { type: String },
    date: { type: Date, default: Date.now },
    base: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Expenditure', expenditureSchema);
