const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            maxLength: 20,
            required: true,
            unique: true
        },
        description:{
            type: String,
            required: true
        },
        deleted_at: {
            type: Date,
            required: false,
            default: null
        }
    },
    { timestamps: true }
);
const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
