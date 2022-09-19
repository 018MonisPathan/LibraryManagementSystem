const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const MemberModule = require('../Models/Member.model');

module.exports = {
    registerMember: async (req, res, next) => {
        try {
            // if(!req.body.firstname){return res.send("No first name")}
            const member = new MemberModule(req.body); //Constructer to moodel

            //Generate salt to hash the password
            const salt = await bcrypt.genSalt(10);

            //now we set user password to hashed password
            member.password = await bcrypt.hash(member.password, salt);

            const result = await member.save(); //save to insert

            if (result) {
                console.log(result);
                res.send(JSON.stringify('User Register Successsfully'));
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
    selectcondition: async (req, res, next) => {
        try {
            const result = await MemberModule.find({deleted_at:null}).select([
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
            } else {
                res.send('Not found');
                return;
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
    softdelete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = {deleted_at: Date.now()}
            const options = {
                new: true
            };
            const result = await MemberModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'SoftDelete failed' });
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
                let result = await MemberModule.findOne({username: req.body.username});
                if (result) {
                    const validpassword = await bcrypt.compare(req.body.password,result.password);

                    // console.log(validpassword); If your password is matched then it returns true.
                    if(validpassword)
                    {
                        if(result.role === "admin")
                        {
                            Jwt.sign(
                                { result },
                                jwtKey,
                                { expiresIn: '2h' },
                                    (error, token) => {
                                    if (error) {
                                        return res.send('something went wrong');
                                    }
                                    res.send({ result, auth: token,role: result.role });
                                    // localStorage.setItem('token', token);
                                }
                            );
                        }
                        
                        if(result.role === "student")
                        {
                            Jwt.sign(
                                { result },
                                jwtKey,
                                { expiresIn: '2h' },
                                    (error, token) => {
                                    if (error) {
                                        return res.send('something went wrong');
                                    }
                                    res.send({ result, auth: token,role: result.role });
                                    // localStorage.setItem('token', token);
                                }
                            );
                        }

                        if(result.role === "librarian")
                        {
                            Jwt.sign(
                                { result },
                                jwtKey,
                                { expiresIn: '2h' },
                                    (error, token) => {
                                    if (error) {
                                        return res.send('something went wrong');
                                    }
                                    res.send({ result, auth: token,role: result.role });
                                    // localStorage.setItem('token', token);
                                }
                            );
                        }
                    }else{
                        res.send(JSON.stringify("Invalid Username or Password!"));
                    }
                        
                } else {
                    // throw createError(404, 'usernot found');
                    res.send(JSON.stringify("User not found"))
                }

                //console.log({ result, auth: token})
            } else {
                return res.send('Invalid creadential');
            }
        } catch (err) {console.log("server error")}
    },
};
