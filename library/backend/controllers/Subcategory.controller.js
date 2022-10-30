const mongoose = require('mongoose');

const SubCategoryModel = require('../Models/subcategory.model');
module.exports = {
    insertSubCategory: async (req, res) => {
        try{
            category = new SubCategoryModel(req.body);
    
            if(!req.body.categoryid || !req.body.subcategory_name || !req.body.subcategory_description){
                return res.send("Please Fill all the fields");
            }
    
            checkexists_subcategory = await SubCategoryModel.findOne({subcategory_name: req.body.subcategory_name});
    
            if(checkexists_subcategory)
            {
                console.log(JSON.stringify("SubCategory Already exists!"));
                return res.send(JSON.stringify("SubCategory Already exists!"));
            }else{
    
                const result = await category.save();
                if (result) {
                    // console.log(result);
                    res.send(JSON.stringify('SubCategory Registered Successsfully'));
                }
            }
        }catch(err){
            console.log(err.message);
        }

    },
    selectSubcategoryByCategoryID:async(req,res)=>{
        try {
        const result=await SubCategoryModel.find({flag:1,categoryid:req.params.categoryid});

         if (result) {
            console.log(result);
            res.send({ data: result });
        } else {
            res.send(JSON.stringify('Not record found'));
            return;
        }
    } catch (err) {
        console.log(err.message);
    }
    },
    selectSubCategoryByID: async (req, res) => {
        try {
            const result = await SubCategoryModel.findById(req.params.id).populate("categoryid" ,"category_name description");

            if (result) {
                console.log(result);
                res.send({ data: result });
            } else {
                res.send(JSON.stringify('Not record found'));
                return;
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    selectActiveSubCategories: async (req, res, next) => {
        try {
            const result = await SubCategoryModel.find({flag:1}).populate("categoryid" ,"category_name description");

            if(result)
            {
                res.send({ data: result });
                console.log(result);
            }else{
                res.send(JSON.stringify("No Records Found!"));
            }

        } catch (err) {
            console.log(err.message);
        }
    },
    selectDeactiveSubCategories: async (req, res, next) => {
        try {
            const result = await SubCategoryModel.find({flag:0}).populate("categoryid" ,"category_name description");

            if(result)
            {
                res.send({ data: result });
                console.log(result);
            }else{
                res.send(JSON.stringify("No Records Found!"));
            }

        } catch (err) {
            console.log(err.message);
        }
    },
    updateSubCategorybyid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await SubCategoryModel.findByIdAndUpdate(
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
    deleteSubCategoryByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await SubCategoryModel.findByIdAndDelete(
                req.params.id
            );
            if (result) {
                return res.send({ msg: 'SubCategory deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    SoftdeleteSubCategoryByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const id = req.params.id;
            const statuscheck=await SubCategoryModel.findById(id);
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
            const result = await SubCategoryModel.findByIdAndUpdate(
                id,
                updates,
                options
            );

            if (result) {
                return res.send({ msg: 'SubCategory deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};
