const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    leftlabels: {
        type: [String],
        default: [],
    },
    rightdata: {
        type: Object,
        default: {},
    },
    rightlabels: {
        type: [String],
        default: [],
    },
    righttitle: {
        type: [String],
        default: [],
    },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
