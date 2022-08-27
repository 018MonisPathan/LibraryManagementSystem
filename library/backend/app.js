const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 5000;
const MemberRoute = require('./Routes/member.route');
const CategoryRoute = require('./Routes/category.route');
app.use(express.json());
app.use(cors());

require('./DB/config')();

app.use('/member', MemberRoute);
app.use('/category', CategoryRoute);
console.log('Running at Port: ' + PORT);
app.listen(PORT);
