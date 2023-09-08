const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    age: Number,
    email: { type: String, unique: true, index: true },
    country: { type: String, index: true }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
