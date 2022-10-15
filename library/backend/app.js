const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const MemberRoute = require('./Routes/member.route');
const CategoryRoute = require('./Routes/category.route');
const SubCategoryRoute = require('./Routes/subcategory.route');
const AddBookRoute = require('./Routes/addbook.route');
const SettingsRoute=require('./Routes/settings.route');
const ReturnBookRoute=require('./Routes/returnbook.route');

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));

require('./DB/config')();

app.use('/member', MemberRoute);
app.use('/category', CategoryRoute);
app.use('/subcategory', SubCategoryRoute);
app.use('/AddBook', AddBookRoute);
app.use('/Settings', SettingsRoute);
app.use('/ReturnBook', ReturnBookRoute);

console.log('Running at Port: ' + PORT);
app.listen(PORT);
