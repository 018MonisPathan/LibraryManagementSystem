const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
            maxLength: 20,
            required: true,
            unique: true
        },
        deleted_at: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);
const Category = mongoose.model('category', CategorySchema);
module.exports = Category;
