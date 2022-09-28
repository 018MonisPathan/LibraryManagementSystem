const express = require('express');
const router = express.Router();
const upload = require("../middleware/book_upload");

const AddBookController = require('../controllers/AddBook.controller');
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


router.post('/BookInsert',[auth,upload], AddBookController.insertBook);


router.get('/SelectBookById/:id',[auth], AddBookController.selectBookByID);
router.get('/SelectAllBooks',[auth], AddBookController.selectallBooks);
router.patch('/UpdateBooks/:id',[auth],AddBookController.updateBookbyid);
router.delete('/DeleteBooks/:id',[auth], AddBookController.deleteBookByid);
module.exports = router;
