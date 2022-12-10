const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');

const PORT = 5000;
const MemberRoute = require('./Routes/member.route');
const CategoryRoute = require('./Routes/category.route');
const SubCategoryRoute = require('./Routes/subcategory.route');
const AddBookRoute = require('./Routes/addbook.route');
const SettingsRoute=require('./Routes/settings.route');
const ReturnBookRoute=require('./Routes/returnbook.route');
const IssueBookRoute=require('./Routes/issueBook.route');

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));

require('./DB/config')();

app.use('/member', MemberRoute);
app.use('/category', CategoryRoute);
app.use('/subcategory', SubCategoryRoute);
app.use('/AddBook', AddBookRoute);
app.use('/Settings', SettingsRoute);
app.use('/IssueBook', IssueBookRoute);
app.use('/ReturnBook', ReturnBookRoute);

console.log('Running at Port: ' + PORT);

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "projectcollaboration00@gmail.com",
//         pass: "bpyzdozqmzqzmjao",
//     }
// })

// let details ={
//     from:"projectcollaboration00@gmail.com",
//     to:"19bmiit018@gmail.com",
//     subject:"Testing nodemailer",
//     text:"testing mail"
// }

// transporter.sendMail(details ,err =>{
//     if(err){
//         console.log("Error");
//         console.log(err.message);
//     }
//     else{
//         console.log("Mail sent");
//     }
// })

app.listen(PORT);

