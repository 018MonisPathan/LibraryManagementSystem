const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            maxLength: 35,
            required: [true,'firstname required']           
        },  
        lastname: {
            type: String,
            maxLength: 35,
            required: false
        },
        address: {
            type: String,
            maxLength: 100,
            required: false
        },
        email: {
            type: String,
            maxLength: [60, 'Only 60 characters are allowed1'],
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'Invalid Email Address'
            ],
            unique: true,
            required: false
        },
        contactno: {
            type: Number,
            minLength: 10,
            maxLength: 10,
            required: false,
            unique: true,
            match: [/^[789]\d{9}$/, 'Please Fill a valid Contact Number']
        },
        dob: {
            type: Date,
            min: Date.now,
            required: false
        },
        alternate_contact_name: {
            type: String,
            maxLength: 70,
            required: false
        },
        alternate_contact_contactno: {
            type: Number,
            minLength: 10,
            maxLength: 10,
            required: false,
            unique: true,
            match: [/^[789]\d{9}$/, 'Please Fill a valid Contact Number']
        },
        username: {
            type: String,
            unique: true,
           
            maxLength: 15,
            required: false
        },
        password: {
            type: String,
            match: [
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain 1 number,1 uppercase and lowercase letter and 1 special character'
            ],
            required: false
        },
        role: {
            type: String,
            required: false
        },
        total_issued_books: {
            type: Number,
            required: false,
            default: 0
        },
        deleted_at: {
            type: Date,
            required: false
        }
    },
    { timestamps: true }
);

//module.exports = mongoose.model('tbl_member', schema);

const MemberModule = mongoose.model('tbl_member', schema);
module.exports = MemberModule;
