const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            maxLength: 35,
            required: [true, 'firstname required']
        },
        lastname: {
            type: String,
            maxLength: 35,
            required: [true, 'lastname required']
        },
        address: {
            type: String,
            maxLength: 100,
            required: [true, 'address required']
        },
        email: {
            type: String,
            maxLength: [60, 'Only 60 characters are allowed1'],
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'Invalid Email Address'
            ],
            unique: true,
            required: [true, 'email required']
        },
        contactno: {
            type: Number,
            minLength: 10,
            maxLength: 10,
            required: [true, 'contactno required'],
            unique: true,
            match: [/^[789]\d{9}$/, 'Please Fill a valid Contact Number']
        },
        dob: {
            type: Date,
            max: Date.now,
            required: [true, 'dob required']
        },
        alternate_contact_name: {
            type: String,
            maxLength: 70,
            required: [true, 'alternate_contact_name required']
        },
        alternate_contact_contactno: {
            type: Number,
            minLength: 10,
            maxLength: 10,
            required: [true, 'alternate_contact_contactno required'],
            unique: true,
            match: [/^[789]\d{9}$/, 'Please Fill a valid Contact Number']
        },
        username: {
            type: String,
            unique: true,
            maxLength: 15,
            required: [true, 'username required']
        },
        password: {
            type: String,
            // match: [
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //     'Password must contain 1 number,1 uppercase and lowercase letter and 1 special character'
            // ],
            required: [true, 'password required']
        },
        role: {
            type: String,
            required: [true, 'role required']
        },
        deleted_at: {
            type: Date,
            required: false,
            default: null
        },
        flag:{
            type: Number,
            default: 1
        }
    },
    { timestamps: true }
);

//module.exports = mongoose.model('tbl_member', schema);

const MemberModule = mongoose.model('tbl_member', schema);
module.exports = MemberModule;
