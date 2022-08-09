const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category.controller');

router.post('/CategoryInsert/', CategoryController.insertCategory);
router.get('/CategoryById/:id', CategoryController.selectCategoryByID);

module.exports = router;
