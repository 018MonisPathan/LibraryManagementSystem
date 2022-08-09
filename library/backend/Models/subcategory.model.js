const mongoose = require('mongoose');

const schema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subcategory_name: {
        type: String,
        maxLength: 20,
        required: true
    }
});

module.exports = Books = mongoose.model('tbl_member', schema);
