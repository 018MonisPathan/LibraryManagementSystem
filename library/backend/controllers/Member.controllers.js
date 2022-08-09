const mongoose = require('mongoose');

const MemberModule = require('../Models/Member.model');

module.exports = {
    registerMember: async (req, res, next) => {
        try {
            // if(!req.body.firstname){return res.send("No first name")}
            member = new MemberModule(req.body); //Constructer to moodel
            const result = await member.save(); //save to insert

            if (result) {
                console.log('Try');
                console.log(result);
                res.send('User Register Successsfully');
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    selectallmembers: async (req, res, next) => {
        try {
            const result = await MemberModule.find().select([
                '-password',
                '-__v'
            ]);
            res.send({ result: result });
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    selectByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await MemberModule.findById(id);
            if (result) {
                res.send(result);
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteByid: async (req, res, next) => {
        try {
            //return console.log(req.params.id);
            const result = await MemberModule.findByIdAndDelete(req.params.id);
            if (result) {
                return res.send({ msg: 'Member deleted successfully!' });
            } else {
                return res.send({ msg: 'Delete failed!' });
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    updatemember: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {
                new: true
            };
            const result = await MemberModule.findByIdAndUpdate(
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
    login: async (req, res) => {}
};
