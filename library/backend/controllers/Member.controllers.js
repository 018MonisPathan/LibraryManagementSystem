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

            if(!req.body.firstname || !req.body.lastname || !req.body.address || !req.body.email || !req.body.contactno || !req.body.dob || !req.body.alternate_contact_name || !req.body.alternate_contact_contactno || !req.body.username || !req.body.password || !req.body.role)
            {
                return res.send("Please Fill all the fields");
            }

            //Generate salt to hash the password
            const salt = await bcrypt.genSalt(10);

            //now we set user password to hashed password
            member.password = await bcrypt.hash(member.password, salt);

            checkexists_email = await MemberModule.findOne({email: req.body.email});

            if(checkexists_email)
            {
                console.log(JSON.stringify("Email Already exists!"));
                return res.send(JSON.stringify("Email Already exists!"));
            }else{
                const result = await member.save(); //save to insert
    
                if (result) {
                    console.log(result);
                    res.send(JSON.stringify('User Register Successsfully'));
                }
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
            res.send({ data: result });
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    selectDeactiveMembers: async (req, res, next) => {
        try {
            const result = await MemberModule.find({flag:0}).select([
                '-password',
                '-__v'
            ]);
            res.send({ data: result });
            console.log(result);
        } catch (err) {
            console.log(err.message);
        }
    },
    selectActiveMembers: async (req, res, next) => {
        try {
            const result = await MemberModule.find({flag:1}).select([
                '-password',
                '-__v'
            ]);
            res.send({ data: result });
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
            const updates = {flag: 0}
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
    changeFlagStatus_ReturnBookDetails: async(req,res)=>{
        try{
            
            const id = req.params.id;

            const statuscheck=await MemberModule.findById(id);
            console.log(statuscheck.flag);
            let updates={flag:1};
            
            if(statuscheck.flag==true  ){
                console.log("statuscheck true");
                 updates = {flag:0,deleted_at: Date.now()}
            }else{
                console.log("statuscheck false");
                 updates = {flag:1,deleted_at: null}
            }
            
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

        }catch(err){
            console.log(err.message);
            
        };
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

                        if(result.flag === 0){
                            console.log("Your status is deactive right now!!");
                            return res.send(JSON.stringify("Your status is deactive right now!!"));
                        }else{

                            if(result.role === "admin")
                            {
                                // if(result.flag == 0){
                                //     return console.log("Your status is deactive right now!!");
                                // }else{
                                //     return console.log("Your status is Active right now!!");
                                // }
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
                                //return console.log("Your status is Active right now!!");
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
