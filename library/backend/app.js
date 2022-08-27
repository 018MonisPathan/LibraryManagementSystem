const express = require('express');
const app = express();
const PORT = 5000;
const MemberRoute = require('./Routes/member.route');
const CategoryRoute = require('./Routes/category.route');
const SubCategoryRoute = require('./Routes/');
app.use(express.json());

require('./DB/config')();

app.use('/member', MemberRoute);
app.use('/category', CategoryRoute);
app.use('/subcategory', CategoryRoute);
console.log('Running at Port: ' + PORT);
app.listen(PORT);
