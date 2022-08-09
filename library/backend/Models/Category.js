const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        maxLength: 20,
        required: true,
        unique: true
    }
});

module.exports = Book = mongoose.model('category', CategorySchema);
