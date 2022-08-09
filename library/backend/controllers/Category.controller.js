const mongoose = require('mongoose');

const CategoryModel = require('../Models/Category');

module.exports = {
    insertCategory: async (req, res) => {
        category = new CategoryModel(req.body);
        const result = await category.save();
        if (result) {
            console.log(result);
            res.send('User Register Successsfully');
        }
    },
    selectCategoryByID: async (req, res) => {
        try {
            const result = await CategoryModel.findById(req.params.id);

            if (result) {
                console.log(result);
                res.send({ result: result });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};
