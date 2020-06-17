const express = require('express');
const app = express()
app.listen(3000, function() {
    console.log("it is ready:3000");
});
//() for run function creat admin1
require('./tools/initinzshl.js')();

const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/Final', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)