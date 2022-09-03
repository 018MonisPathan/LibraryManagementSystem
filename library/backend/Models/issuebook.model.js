const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        membership_id: {
            type: mongoose.Schema.Types.ObjectId,
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
        late_days: {
            type: Number,
            required: false
        },
        penalty_amount: {
            type: Number,
            required: false
        },
        deleted_at: {
            type: Date,
            required: false,
            default: null
        },
    },
    { timestamps: true }
);

module.exports = Book = mongoose.model('tbl_IssueBookMaster', schema);
