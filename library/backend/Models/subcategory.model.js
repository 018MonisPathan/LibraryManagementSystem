const mongoose = require('mongoose');
const CategoryModel = require('../Models/Category');
const SubCategorySchema = mongoose.Schema({
    categoryid: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
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
