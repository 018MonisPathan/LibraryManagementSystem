const mongoose = require('mongoose');

const AddBookschema =new  mongoose.Schema(
    { 
        title: {
            type: String,
            maxLength: 100,
            required: true
        },
        subcategoryid: {
            type:[{ type: mongoose.Schema.Types.ObjectId, ref:'tbl_subcategory'}],
            required: [true,"SubCategory is required"]
        },
        ISBN_no: {
            type: Number,
            maxLength: 13,
            required: true,
            unique: true
        },
        edition: {
            type: String,
            maxLength: 11,
            required: true
        },
        author: {
            type: String,
            maxLength: 70,
            required: true
        },
        publisher: {
            type: String,
            maxLength: 70,
            required: true
        },
        published_on: {
            type: Date,
            required: true
        },
        quantity: {
            type: Number,
            maxLength: 4,
            required: true
        },
        pdf: {
            type: String,
            required: false
        },
        bookstatus: {
            type: Boolean,
            default: 0,
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

const AddBookModel = mongoose.model('tbl_book_details', AddBookschema);
module.exports = AddBookModel;
