const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: String,
    leftlabels: Array,
    rightdata: Object,
    rightlabels: Array,
    righttitle: Array
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;