const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const SettingController=require('../controllers/Settings.controller');

router.post('/InsertSettings',SettingController.insertSettings);
router.get('/SelectSettings',SettingController.selectallsettings);
router.patch('/UpdateSettings/:id',SettingController.updateSettingsByid);
router.delete('/DeleteSettings/:id',SettingController.deleteSettingByid);

module.exports=router;