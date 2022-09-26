const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category.controller');
const Jwt = require("jsonwebtoken");

const jwtKey = "e-comm";

function auth(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        //token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                res.send('please provide valid token');
            } else {
                next();
            }
        });
    } else {
        res.send('please add token with header');
    }
}


router.post('/CategoryInsert/', CategoryController.insertCategory);
router.get('/CategoryById/:id', CategoryController.selectCategoryByID);
router.get('/SelectAllCategory',[auth], CategoryController.selectallCategories);
router.patch('/UpdateCategory/:id', CategoryController.updateCategorybyid);
router.delete('/DeleteCategory/:id', CategoryController.deleteCategoryByid);

module.exports = router;
