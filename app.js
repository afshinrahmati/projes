const express = require('express');
const app = express()
app.listen(5000, function() {
    console.log("it is ready:5000");
});
//() for run function creat admin1
// require('./tools/initinzshl.js')();

const abirout = require('./router/abirouter');
app.use('/', abirout)


app.use(function(err, req, res, next) {
    res.status(500).send('ssa' + err)
})













const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/Final', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)