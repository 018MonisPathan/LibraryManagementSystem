const mongoose = require('mongoose');

const schema =new mongoose.Schema({
    
   issuebookid: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tbl_IssueBookMaster' }],
        required: [true,"Issuebookid is required"]
    },
    returndate: {
        type: Date,
        required: false,
        default: Date.now
    },
    latedays:{
        type: Number,
        required: [true,'number of latedays requireed'],
        default: 0
    },
    totalpanelty:{
        type: Number,
        required: [true,'total penalty required'],
        default: 0
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
)

const ReturnBookModule = mongoose.model('tbl_return_book', schema);
module.exports = ReturnBookModule;