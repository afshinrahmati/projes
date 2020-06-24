const express = require('express');
const app = express();
let cookie = require('cookie-parser');
const session = require('express-session');
//body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const path = require('path');
app.use(session({
    key: 'user_sid',
    secret: "false",
    resave: false,
    saveUninitialized: false
}))
app.use(function(req, res, next) {
    console.log(req.session);

    next();
})
app.listen(9000, function() {
    console.log("it is ready:9000");
});
//() for run function creat admin1
// require('./tools/initinzshl.js')();

const abirout = require('./router/abirouter');
app.use('/', abirout)







//eroorha
app.use(function(err, req, res, next) {
    res.status(500).send('ssa' + err)
});
//set views(folder)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


//set public(folder)

app.use(express.static(path.join(__dirname, 'public')));
//cookei
// app.use(cookieSession());








const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/Final', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)