const mongoose = require('mongoose');

const CategoryModel = require('../Models/Category');

module.exports = {
    insertCategory: async (req, res) => {
        category = new CategoryModel(req.body);
        const result = await category.save();
        if (result) {
            console.log(result);
            res.send('Category Register Successsfully');
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
            res.send({ result: result });
            console.log(result);
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
