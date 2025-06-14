const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role : {type: String, enum: ['Admin', 'BaseCommander', 'LogisticsOfficer'], required: true},
    base: { type: mongoose.Schema.Types.ObjectId, ref: 'Base'}
});

module.exports = mongoose.model('User', userSchema);
