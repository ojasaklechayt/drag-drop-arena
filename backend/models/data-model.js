const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    age: Number,
    email: String,
    country: String

});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;