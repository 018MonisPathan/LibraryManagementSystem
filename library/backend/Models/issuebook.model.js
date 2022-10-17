const mongoose = require('mongoose');

const schema =new mongoose.Schema(
    {
        book_id: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tbl_book_details' }],
            required: true
        },
        membership_id: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tbl_member' }],
            required: true
        },
        issuedate: {
            type: Date,
            default: Date.now,
            required: true
        },
        renewdate: {
            type: Date,
            required: false
        },
        duedate: {
            type: Date,
            required: true
        },
        issue_status: {
            type: Boolean,
            default: 0,
            required: true
        },
        deleted_at: {
            type: Date,
            required: false,
            default: null
        },
        flag:{
            type: Boolean,
            default: 1
        }
    },
    { timestamps: true }
);

const IssueBookModule = mongoose.model('tbl_IssueBookMaster', schema);
module.exports = IssueBookModule;