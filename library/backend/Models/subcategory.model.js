const mongoose = require('mongoose');

const SubCategorySchema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
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

