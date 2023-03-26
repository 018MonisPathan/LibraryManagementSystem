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


router.post('/CategoryInsert/',[auth], CategoryController.insertCategory);
router.get('/CategoryById/:id',[auth], CategoryController.selectCategoryByID);
router.get('/SelectActiveCategory',[auth], CategoryController.selectActiveCategories);
router.get('/SelectDeactiveCategories',[auth],CategoryController.selectDeactiveCategories);
router.patch('/UpdateCategory/:id',[auth], CategoryController.updateCategorybyid);
router.delete('/DeleteCategory/:id',[auth], CategoryController.deleteCategoryByid);
router.patch('/SoftDeleteCategory/:id',[auth],CategoryController.SoftdeleteCategoryByid);
router.get('/searchActiveCategory/:key',[auth],CategoryController.searchActivecategory);
router.get('/searchDeactiveCategory/:key',[auth],CategoryController.searchDeactiveCategory);

module.exports = router;
