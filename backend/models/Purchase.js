const mongoose = require('mongoose');
const { create } = require('./User');

const purchaseSchema = new mongoose.Schema({
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    base: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
    createby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Purchase', purchaseSchema);
