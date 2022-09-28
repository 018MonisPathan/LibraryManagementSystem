const mongoose = require('mongoose');

const SettingsModel=require('../Models/Settings');

module.exports={
    insertSettings: async (req, res) => {
        setting = new SettingsModel(req.body);
        
        if(!req.body.penalty_amount || !req.body.student_booklimit || !req.body.faculty_booklimit || !req.body.renewdaylimit){
            return res.send("Please Fill all the fields");
        }
            const result = await setting.save();
            if(result)
            {
                return res.send(JSON.stringify('Settings Set Successsfully'));
            }
            else{
                res.send(JSON.stringify('Settings NOT SET!'));
            }
    },
    selectallsettings: async (req, res, next) => {
        try {
            const result = await SettingsModel.find();
            if(result){
                res.send({ data: result });
                console.log(result);
            }
            else{
                console.log('No records found');
                res.send(JSON.stringify('No records found'));
            }
           
        } catch (err) {
            console.log(err.message);
        }
    },
    updateSettingsByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await SettingsModel.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'update failed' });
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    deleteSettingByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await SettingsModel.findByIdAndDelete(
                req.params.id
            );
            if (result) {
                return res.send({ msg: 'Settings deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

};