const mongoose = require('mongoose');

const ReturnBookModule=require('../Models/returnbook.model');
const AddBookModel = require('../Models/addbook.model');
const IssueBookModel=require('../Models/issuebook.model');
module.exports={
    insertReturnBookDetails: async (req, res) => {
        setting = new ReturnBookModule(req.body);
        
        if(!req.body.latedays || !req.body.totalpanelty){
            return res.send("Please Fill all the fields");
        }
        //Issue book model
        const bookid=await IssueBookModel.findById(req.body.issuebookid);

        //AddBook model
        const checkquantity=await AddBookModel.findById(bookid.book_id);

        //find book from table then find quantity 
        if(checkquantity){
        var quant=checkquantity.quantity;

            const result = await setting.save();
            if(result)
            {
                quant=quant+1;
                const id=bookid.book_id;
                const update={quantity: quant}
                const options = {
                    new: true
                };
                const quantitiymanage=await AddBookModel.findByIdAndUpdate(id,update,options);

                if(quantitiymanage){
                    console.log("Quantitiy increased by one");
                }
                else{
                    console.log("Quantitiy NOT increased by one");
                }

                const id1=req.body.issuebookid;
                const update1={flag:false}               

                const bookreturned=await IssueBookModel.findByIdAndUpdate(id1,update1,options);

                return res.send(JSON.stringify('Return book details added Successsfully'));

                
            }
            else{
                res.send(JSON.stringify('Return book details!'));
            }
        }else{
            console.log('No records found');
            res.send(JSON.stringify('No records found'));
        }
    },
    selectallReturnBookDetails: async (req, res, next) => {
        try {
            const result = await ReturnBookModule.find().populate();
            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
           
        } catch (err) {
            console.log(err.message);
        }
    },
    select_onlyActiveDetails:async(req,res)=>{
        try {
            const result = await ReturnBookModule.find({flag:1});
            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
           
        } catch (err) {
            console.log(err.message);
        }
    },
    select_onlyDeactiveDetails:async(req,res)=>{
        try {
            const result = await ReturnBookModule.find({flag:0});
            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
           
        } catch (err) {
            console.log(err.message);
        }
    },
    updateReturnBookDetailsByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await ReturnBookModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'update failed' });
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    deleteReturnBookDetailsid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await ReturnBookModule.findByIdAndDelete(
                req.params.id
            );
            if (result) {
                return res.send({ msg: 'Return Book Details deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }

    },
    changeFlagStatus_ReturnBookDetails: async(req,res)=>{
        try{
            
            const id = req.params.id;

            const statuscheck=await ReturnBookModule.findById(id);
            console.log(statuscheck.flag);
            let updates={flag:1};
            
            if(statuscheck.flag==true  ){
                console.log("statuscheck true");
                 updates = {flag:0,deleted_at: Date.now()}
            }else{
                console.log("statuscheck false");
                 updates = {flag:1,deleted_at: null}
            }
            
            const options = {
                new: true
            };
            const result = await ReturnBookModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'SoftDelete failed' });
            }
            res.send(result);

        }catch(err){
            console.log(err.message);
            
        };
    }
};

