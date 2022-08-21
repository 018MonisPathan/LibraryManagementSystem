const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

const mongoose = require('mongoose');

const MemberModule = require('../Models/Member.model');

module.exports = {
    registerMember: async (req, res, next) => {
        try {
            // if(!req.body.firstname){return res.send("No first name")}
            member = new MemberModule(req.body); //Constructer to moodel
            const result = await member.save(); //save to insert

            if (result) {
             
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
    login: async (req, res, next) => {
        try {
            if (req.body.username && req.body.password) {
               
                console.log(req.body.username);
                console.log(req.body.password);

                //Select to hide output
                let result = await MemberModule.findOne(req.body).select([
                    '-password',
                    '-__v'
                ]);
                if (result) {
                    Jwt.sign(
                        { result },
                        jwtKey,
                        { expiresIn: '2h' },
                            (error, token) => {
                            if (error) {
                                return res.send('something went wrong');
                            }
                            res.send({ result, auth: token });
                            // localStorage.setItem('token', token);
                        }
                    );
                } else {
                    // throw createError(404, 'usernot found');
                    resp.send("User not found")
                }

                //console.log({ result, auth: token})
            } else {
                return res.send('Invalid creadential');
            }
        } catch (err) {console.log(err.message)}
    }
};
