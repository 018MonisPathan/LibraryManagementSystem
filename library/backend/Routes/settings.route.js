const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const SettingController=require('../controllers/Settings.controller');

const jwtKey = 'e-comm';

router.post('/InsertSettings',[auth],SettingController.insertSettings);
router.get('/SelectSettings',[auth],SettingController.selectallsettings);
router.get('/SelectSettingsByid/:id',[auth],SettingController.selectByid);
router.patch('/UpdateSettings/:id',[auth],SettingController.updateSettingsByid);
router.delete('/DeleteSettings/:id',[auth],SettingController.deleteSettingByid);

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

module.exports=router;