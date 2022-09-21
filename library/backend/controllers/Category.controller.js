const mongoose = require('mongoose');

const CategoryModel = require('../Models/Category');

const {check,validationResult} = require('express-validator');

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
                res.send({ result: result });
            } else {
                res.send('Not found');
                return;
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    selectallCategories: async (req, res, next) => {
        try {
            const result = await CategoryModel.find();

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

            if(!req.body.category_name || !req.body.description){
                return res.send("Please Fill all the fields");
            }

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
            const result = await CategoryModel.findByIdAndDelete(req.params.id);
            if (result) {
                return res.send({ msg: 'Category deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};
