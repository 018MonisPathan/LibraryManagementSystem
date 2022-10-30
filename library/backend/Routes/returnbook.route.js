const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const express = require('express');

const router = express.Router();
const ReturnBookController = require('../controllers/ReturnBook.controller');

router.post("/insertReturnBookDetails",ReturnBookController.insertReturnBookDetails);
router.get("/selectReturnBookDetails",ReturnBookController.selectallReturnBookDetails);

router.get("/selectActiveReturnBookDetails",ReturnBookController.select_onlyActiveDetails);
router.get("/selectDeactiveReturnBookDetails",ReturnBookController.select_onlyDeactiveDetails);

router.patch("/changeBookStatus/:id",ReturnBookController.changeFlagStatus_ReturnBookDetails);

router.patch("/updateReturnBookDetails/:id",ReturnBookController.updateReturnBookDetailsByid);
router.delete("/deleteReturnBookDetails/:id",ReturnBookController.deleteReturnBookDetailsid);

module.exports = router;