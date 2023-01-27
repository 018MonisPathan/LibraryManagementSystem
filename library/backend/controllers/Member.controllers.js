const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const MemberModule = require('../Models/Member.model');
const Emailer= require('../controllers/ForgetPassword.controller');
var randomNumber = require("random-number-csprng");
var Promise=require('bluebird');

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
    ResendOTP:async(req,res)=>{

        var provided_email= req.body.email;

        if(provided_email){
            console.log(provided_email);

            var OTP="";
            Promise.try(function(){
                return randomNumber(1000,9999);
               }).then(function(number) {
                   console.log(number);
                   OTP=String(number);
               }).catch({code:"RandomGenerationError"},function(err) {
                   console.log("Something Went wrong!");
               });
    
            //now we set OTP to hashed OTP
            const salt = await bcrypt.genSalt(10);
            var hashedOTP = await bcrypt.hash(OTP, salt);
            console.log("Resent Hashed OTP" + hashedOTP);
            
            Emailer.Send_Email(provided_email,"OPT For Forget Password",OTP);

        }else{
            console.log("No Email found");
        }
    },
    verifyOTP:async (req,res) => {
        try {
           var hashedOTP=req.body.hashedOTP;
            var actualOTP=req.body.OTP;

            // const salt = await bcrypt.genSalt(10);
            // var hashing = await bcrypt.hash(actualOTP,salt);

            //console.log(hashing);

            var result= await bcrypt.compare(actualOTP,hashedOTP);
            console.log(result);
            if(result){
                return res.send(JSON.stringify("ValidOTP"));
            }else{
                return res.send(JSON.stringify("Invalid OTP"));
            }

        } catch (err) {
           console.log(err.message);
        }
    },
    listMemberByEmail:async (req,res) => {
        try {
            var provided_email= req.params.email;
            const result =await MemberModule.findOne({email:provided_email}).select([
                '-password',
                '-__v'
            ]);
            if (result) {
                if(result.flag==0){
                    console.log("Your status is deactive right now!!");
                    return res.send(JSON.stringify("Your status is deactive right now!!"));
                }else{
                    //res.send(result);
                    console.log("Email Found");
                    console.log(result);

                    var OTP="";
                    Promise.try(function(){
                        return randomNumber(1000,9999);
                       }).then(function(number) {
                           console.log(number);
                           OTP=String(number);
                       }).catch({code:"RandomGenerationError"},function(err) {
                           console.log("Something Went wrong!");
                       });

                    //now we set OTP to hashed OTP
                    const salt = await bcrypt.genSalt(10);
                    var hashedOTP = await bcrypt.hash(OTP, salt);
                    console.log("Hashed OTP" + hashedOTP);
                    var id=result._id
                    var email=result.email

                    const obj={id,email,hashedOTP}
                      // Model.create(obj)
                    res.send(obj)
                    console.log(obj);

                    Emailer.Send_Email(provided_email,"OPT For Forget Password",OTP);
                       
                }
            } else {
                return res.send(JSON.stringify("Invalid email"));
                
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    changePassword_afterOTP:async(req,res) => {
        const id = req.params.id;

        var toencrypt=req.body.password;

        const salt = await bcrypt.genSalt(10);
        var hashed_password = await bcrypt.hash(toencrypt, salt);

        const updates = {password:hashed_password}
            const options = {
                new: true
            };
            const result = await MemberModule.findByIdAndUpdate(
                id,
                updates,
                options
            );
            if (!result) {
                return res.send({ error: 'New password caould not be added' });
            }
            res.send(result);
    } 
    ,
    selectByid: async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await MemberModule.findById(id);
            if (result) {
                return res.send(result);
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

    changePassword: async (req, res, next) => {
        try{
            // const id = req.params.id;
            //const update = {password: req.body.password};
            const options = {
                new: true
            };

            const id = req.params.id

            const userExists = await MemberModule.findById(id);

            if(userExists){

                //const result = await MemberModule.findOne()

                const validatPassword = await bcrypt.compare(req.body.Oldpassword,userExists.password);

                if(validatPassword){
                   console.log("User has entered correct old password");
                    
                    const pwd = req.body.password;
                    
                    const CompareOldAndNewPassword = await bcrypt.compare(pwd,userExists.password);

                    if(CompareOldAndNewPassword){
                        return res.send(JSON.stringify("Old and new password can not be same!!"));
                    }else{
                        //return console.log("Both are different");
                        //Generate salt to hash the password
                        const salt = await bcrypt.genSalt(10);
    
                        const HashPassword = await bcrypt.hash(pwd, salt);
    
                        //console.log(HashPassword);
    
                        const hashPwd = {password: HashPassword}
    
                        console.log(hashPwd);

                        const updatePassword = await  MemberModule.findByIdAndUpdate(
                            id,
                            hashPwd,
                            options
                        );
    
                        if(updatePassword){
                            res.send(JSON.stringify("Password Updated Successfully!!"));
                        }else{
                            console.log("Password not updated");
                        }
                    }
                    
                }else{
                    return res.send(JSON.stringify("Please Enter correct old password!!"));
                }
            }
        }catch(err){
            res.send(err)
        }
    },

    softdelete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = {flag:0,deleted_at: Date.now()}
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

                            if(result.role === "faculty")
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
