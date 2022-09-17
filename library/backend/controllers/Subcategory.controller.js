const mongoose = require('mongoose');

const SubCategoryModel = require('../Models/subcategory.model');
module.exports = {
    insertSubCategory: async (req, res) => {
        category = new SubCategoryModel(req.body);
        const result = await category.save();
        if (result) {
            // console.log(result);
            res.send(JSON.stringify('SubCategory Registered Successsfully'));
        }
    },
    selectSubCategoryByID: async (req, res) => {
        try {
            const result = await SubCategoryModel.findById(req.params.id);

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
    selectallSubCategories: async (req, res, next) => {
        try {
            const result = await SubCategoryModel.find();
            res.send({ result: result });
            console.log(result);
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
    }
};
