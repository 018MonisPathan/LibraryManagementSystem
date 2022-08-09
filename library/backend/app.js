const express = require('express');
const app = express();
const PORT = 5000;
const MemberRoute = require('./Routes/member');
app.use(express.json());

require('./DB/config')();

app.use('/member', MemberRoute);

console.log('Running at Port: ' + PORT);
app.listen(PORT);
