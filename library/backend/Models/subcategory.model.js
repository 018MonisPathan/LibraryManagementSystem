const mongoose = require('mongoose');

const SubCategorySchema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    subcategory_name: {
        type: String,
        maxLength: 20,
        required: true
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null
    }
});

const SubCategory = mongoose.model('subcategory', SubCategorySchema);
module.exports = SubCategory;

