const express = require('express');
const router = express.Router();

const AddBookController = require('../controllers/AddBook.controller');

router.post('/BookInsert', AddBookController.insertBook);


router.get('/SelectBookById/:id', AddBookController.selectBookByID);
router.get('/SelectAllBooks', AddBookController.selectallBooks);
router.patch('/UpdateBooks/:id',AddBookController.updateBookbyid);
router.delete('/DeleteBooks/:id', AddBookController.deleteBookByid);
module.exports = router;
