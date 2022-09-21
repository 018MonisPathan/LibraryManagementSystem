const mongoose = require('mongoose');
const CategoryModel = require('../Models/Category');
const SubCategorySchema = new mongoose.Schema({
    categoryid: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
        required: [true,"Category is required"]
        //ref: Category
    },
    subcategory_name: {
        type: String,
        maxLength: 20,
        required: [true,"SubCategoryname is required"]
    },
    subcategory_description:{
        type: String,
        required: [true,"SubCategory description is required"]
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null
    }
});

const SubCategory = mongoose.model('tbl_subcategory', SubCategorySchema);
module.exports = SubCategory;
