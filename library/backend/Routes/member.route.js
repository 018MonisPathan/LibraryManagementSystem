const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const express = require('express');

//const auth = require('../middleware/auth');
const router = express.Router();

const MemberController = require('../controllers/Member.controllers');

router.post('/register', MemberController.registerMember);
router.patch('/updatemember/:id', MemberController.updatemember);
router.get('/listMembers', auth, MemberController.selectallmembers);
router.get('/listMembersnotdeleted', MemberController.selectcondition);
router.get('/listMembersByid/:id', MemberController.selectByid);
router.delete('/deleteMemberByid/:id', MemberController.deleteByid);
router.post('/login', MemberController.login);

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
