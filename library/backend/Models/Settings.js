const mongoose = require('mongoose');
const SettingsSchema = new mongoose.Schema({
    panalty_amount: {
        type: Number,
        required: true
    },
    student_booklimit: {
        type: Number,
        required: true
    },
    faculty_booklimit: {
        type: Number,
        required: true
    },
    renewdaylimit: {
        type: Number,
        required: true
    }
});

module.exports = Book = mongoose.model('settings', SettingsSchema);
