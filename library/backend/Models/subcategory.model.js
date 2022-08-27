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
    }
});

const SubCategory = mongoose.model('subcategory', SubCategorySchema);
module.exports = SubCategory;

