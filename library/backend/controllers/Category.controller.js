const mongoose = require('mongoose');

const CategoryModel = require('../Models/Category');

//import subcategory model
const SubCategoryModel = require('../Models/subcategory.model');

module.exports = {
    insertCategory: async (req, res) => {
        category = new CategoryModel(req.body);

        if(!req.body.category_name || !req.body.description){
            return res.send("Please Fill all the fields");
        }

        checkexists_category = await CategoryModel.findOne({category_name: req.body.category_name});

        if(checkexists_category)
        {
            console.log(JSON.stringify("Category Already exists!"));
            return res.send(JSON.stringify("Category Already exists!"));
        }else{
            const result = await category.save();
            if(result)
            {
                return res.send(JSON.stringify('Category Register Successsfully'));
            }
        }

    },
    selectCategoryByID: async (req, res) => {
        try {
            const result = await CategoryModel.findById(req.params.id);

            if (result) {
                console.log(result);
                res.send({ data: result });
            } else {
                res.send('Not found');
                return;
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    selectActiveCategories: async (req, res, next) => {
        try {
            const result = await CategoryModel.find({flag:1});

            if(result)
            {
                res.send({ data: result });
            }else{
                res.send(JSON.stringify("No records found!"));
            }

            //console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    selectDeactiveCategories: async (req, res, next) => {
        try {
            const result = await CategoryModel.find({flag:0});

            if(result)
            {
                res.send({ data: result });
            }else{
                res.send(JSON.stringify("No records found!"));
            }

            //console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    updateCategorybyid: async (req, res, next) => {
        try {

            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await CategoryModel.findByIdAndUpdate(
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
    deleteCategoryByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);

            //Check wether the category all ready exists in subcategory than do not delete the category.
            checkexists_categoryInSubCategory = await SubCategoryModel.findOne({categoryid: req.params.id});

            if(checkexists_categoryInSubCategory){
                console.log(JSON.stringify("Category already exists in subcategory"));
                return res.send(JSON.stringify("Category already exists in subcategory"))
            }else{

                const result = await CategoryModel.findByIdAndDelete(req.params.id);
                if (result) {
                    return res.send({ msg: 'Category deleted successfully!' });
                } else {
                    return res.send({ msg: 'Delete failed!' });
                }
            }

        } catch (err) {
            console.log(err.message);
        }
    },
    SoftdeleteCategoryByid: async (req, res, next) => {
        try {
            //Check wether the category all ready exists in subcategory than do not delete the category.
            checkexists_categoryInSubCategory = await SubCategoryModel.findOne({categoryid: req.params.id});

            if(checkexists_categoryInSubCategory){
                console.log(JSON.stringify("Category already exists in subcategory"));
                return res.send(JSON.stringify("Category already exists in subcategory"))
            }else{

                const id = req.params.id;
                const statuscheck=await CategoryModel.findById(id);
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
                const result = await CategoryModel.findByIdAndUpdate(
                    id,
                    updates,
                    options
                );
            
                if (result) {
                    return res.send({ msg: 'Category deleted successfully!' });
                } else {
                    return res.send({ msg: 'Delete failed!' });
                }
               res.send(result);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};
