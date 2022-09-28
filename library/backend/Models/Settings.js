const mongoose = require('mongoose');
const SettingsSchema = new mongoose.Schema({
    penalty_amount: {
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
},
{ timestamps: true });
const Settings = mongoose.model('tbl_settings', SettingsSchema);
module.exports = Settings;


