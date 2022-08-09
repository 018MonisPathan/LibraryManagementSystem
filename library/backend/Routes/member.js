const express = require('express');
//const auth = require('../middleware/auth');
const router = express.Router();

const MemberController = require('../controllers/Member.controllers');

router.post('/register', MemberController.registerMember);
router.patch('/updatemember/:id', MemberController.updatemember);
router.get('/listMembers', MemberController.selectallmembers);
router.get('/listMembersByid/:id', MemberController.selectByid);
router.delete('/deleteMemberByid/:id', MemberController.deleteByid);
module.exports = router;
