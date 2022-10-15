const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const express = require('express');
const IssueBookController=require("../controllers/IssueBook.controller")
const router = express.Router();

router.post("/insertIssueBookDetails",IssueBookController.insertIssueBookDetails);
router.get("/selectIssueBookDetails",IssueBookController.selectallIssueBookDetails);

router.get("/selectActiveIssueBookDetails",IssueBookController.select_onlyActiveDetails);
router.get("/selectDeactiveIssueBookDetails",IssueBookController.select_onlyDeactiveDetails);

router.patch("/activate_deactivateIssueBookDetails/:id",IssueBookController.changeFlagStatus_ReturnBookDetails);

router.patch("/updateIssueBookDetails/:id",IssueBookController.updateIssueBookDetailsByid);
router.delete("/deleteIssueBookDetails/:id",IssueBookController.deleteIssueBookDetailsid);

module.exports = router;