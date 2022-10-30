const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const SubCategoryController = require('../controllers/Subcategory.controller');

const jwtKey = 'e-comm';

router.post('/SubCategoryInsert/',[auth], SubCategoryController.insertSubCategory);
router.get('/SubCategoryById/:id',[auth], SubCategoryController.selectSubCategoryByID);
router.get('/selectSubcategoryByCategoryID/:categoryid',[auth], SubCategoryController.selectSubcategoryByCategoryID);
router.get('/SubSelectActiveCategory',[auth],SubCategoryController.selectActiveSubCategories);
router.get('/SubSelectDeactive',[auth],SubCategoryController.selectDeactiveSubCategories);
router.patch('/SubUpdateCategory/:id',[auth], SubCategoryController.updateSubCategorybyid);
router.delete('/SubDeleteCategory/:id',[auth], SubCategoryController.deleteSubCategoryByid);
router.patch('/SoftDeleteSubCategory/:id',[auth],SubCategoryController.SoftdeleteSubCategoryByid);

function auth(req, res, next) {
    let token = req.headers['authorization'];
    //let token = console.log(localStorage.get('token'));
    if (token) {
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                res.send('please provide valid token');
            } else {
                //localStorage.removeItem('token');
                console.log('Token Get it');
                next();
            }
        });
        //console.log("Token Get it");
    } else {
        res.send('please add token with header');
    }
}

module.exports = router;
