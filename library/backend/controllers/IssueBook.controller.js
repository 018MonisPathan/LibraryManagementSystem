const mongoose = require('mongoose');

const IssueBookModel=require('../Models/issuebook.model');
const AddBookModel = require('../Models/addbook.model');

module.exports={
 insertIssueBookDetails: async (req, res) => {
    try{
        Issuebook = new IssueBookModel(req.body);
        
        if(!req.body.book_id || !req.body.membership_id  || !req.body.duedate)
        {
            return res.send("Please Fill all the fields");
        }

        const checkquantity=await AddBookModel.findById(req.body.book_id);

        var quant=checkquantity.quantity;

        if(quant>0){
            console.log("book in stock");
            
            const result = await Issuebook.save();
            if(result)
            {  
                quant=quant-1;
                const id=req.body.book_id;
                const update={quantity: quant}
                const options = {
                    new: true
                };
                const quantitiymanage=await AddBookModel.findByIdAndUpdate(id,update,options);

                if(quantitiymanage){
                    console.log("Quantitiy decresed by one");
                }
                else{
                    console.log("Quantitiy NOT decresed by one");
                }

                return res.send(JSON.stringify('Issue book details added Successsfully'));
            }
            else{
                res.send(JSON.stringify('Issue book details not added!')); 
            }

        }else{
            res.send(JSON.stringify('Book out of stock!'));
        }
    }catch(err){
        console.log(err.message);
    }
           
    },
    selectallIssueBookDetails: async (req, res, next) => {
        try {
            const result = await IssueBookModel.find().populate("book_id","title pdf").populate("membership_id","firstname");
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
            const result = await IssueBookModel.find({flag:1});
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
            const result = await IssueBookModel.find({flag:0});
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
    updateIssueBookDetailsByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await IssueBookModel.findByIdAndUpdate(
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
    deleteIssueBookDetailsid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await IssueBookModel.findByIdAndDelete(
                req.params.id
            );
            if (result) {
                return res.send({ msg: 'Issue Book Details deleted successfully!' });
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

            const statuscheck=await IssueBookModel.findById(id);
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
            const result = await IssueBookModel.findByIdAndUpdate(
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