const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category.controller');

router.post('/CategoryInsert/', CategoryController.insertCategory);
router.get('/CategoryById/:id', CategoryController.selectCategoryByID);
router.get('/SelectAllCategory', CategoryController.selectallCategories);
router.patch('/UpdateCategory/:id', CategoryController.updateCategorybyid);
router.delete('/DeleteCategory/:id', CategoryController.deleteCategoryByid);

module.exports = router;
