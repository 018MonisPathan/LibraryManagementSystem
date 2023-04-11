const mongoose = require('mongoose');

const IssueBookModel=require('../Models/issuebook.model');
const AddBookModel = require('../Models/addbook.model');


module.exports={
 insertIssueBookDetails: async (req, res) => {
    try{
        
        if(!req.body.ISBN_no || !req.body.membership_id )
        {
            return res.send("Please Fill all the fields");
        }

        //Calculating DueDate
         var dateget = new Date();
         dateget.setDate(dateget.getDate() + 15);
         var dueDate = dateget.toISOString().split('T')[0];
    
        //To get Book ID Form ISBN Number
        var ISBN = req.body.ISBN_no
        const book_id_get = await AddBookModel.findOne({ISBN_no:ISBN}).lean();
        console.log(book_id_get._id);

        Issuebook = new IssueBookModel({
            book_id:book_id_get,
            membership_id:req.body.membership_id,
            duedate:dueDate,
        });

        //Check total issue book limit
        const membership_id = req.body.membership_id;
        const checkissue_limit = await IssueBookModel.find({membership_id: membership_id}).count();

        //return console.log(checkissue_limit);

        console.log(checkissue_limit);
        if(checkissue_limit > 3){
            console.log("You have already issue 3 book!!");
            return res.send(JSON.stringify("You have already issue 3 book!!"));
        }

        const checkquantity=await AddBookModel.findById(book_id_get);

        var quant=checkquantity.quantity;

        if(quant>0){
            console.log("book in stock");
            
            const result = await Issuebook.save();
            if(result)
            {  
                quant=quant-1;
                const id=book_id_get;
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
            const result = await IssueBookModel.find({flag:1}).populate("book_id","title author pdf").populate("membership_id","firstname");
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
            const result = await IssueBookModel.find({flag:0}).populate("book_id","title author pdf").populate("membership_id","firstname");;
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
            console.log("Body = ",req.body);
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
    },
    selectallIssueBookDetailsByMembershipId: async (req, res, next) => {
        try {

            //return console.log("select called");
            //const id = req.body.membership_id;
            const membership_id = req.params.membership_id;

            //return console.log(id);

            const result = await IssueBookModel.find({flag:true,membership_id: membership_id}).populate("book_id","title pdf").populate("membership_id","firstname");
            //return console.log(JSON.stringify(result));
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

    selectallIssueBookDetailByIssueBookId: async (req,res,next) => {
        try{
            const issuebook_id = req.params.id;

            console.log(issuebook_id);

            const result = await IssueBookModel.find({flag:true,_id: issuebook_id}).populate("book_id","title pdf").populate("membership_id","firstname");
            //return console.log(JSON.stringify(result));
            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
        }catch(err){
            console.log(err);
        }
    }
};