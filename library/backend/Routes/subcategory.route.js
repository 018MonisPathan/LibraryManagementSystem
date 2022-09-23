const express = require('express');
const router = express.Router();
const SubCategoryController = require('../controllers/Subcategory.controller');

router.post('/SubCategoryInsert/', SubCategoryController.insertSubCategory);
router.get('/SubCategoryById/:id', SubCategoryController.selectSubCategoryByID);
router.get('/selectSubcategoryByCategoryID/:categoryid', SubCategoryController.selectSubcategoryByCategoryID);
router.get('/SubSelectAllCategory', SubCategoryController.selectallSubCategories);
router.patch('/SubUpdateCategory/:id', SubCategoryController.updateSubCategorybyid);
router.delete('/SubDeleteCategory/:id', SubCategoryController.deleteSubCategoryByid);

module.exports = router;
