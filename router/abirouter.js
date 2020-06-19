const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path');


const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
//view
router.get('/singup', jsonParser, (req, res) => {
    res.render('../views/pages/singup.ejs')
});
router.get('/login', (req, res) => {
    res.render('../views/pages/login.ejs')
})
router.post('/record', jsonParser, function(req, res) {

    const userrout = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        userName: req.body.userName,
        password: req.body.password,
        sex: req.body.sex[0],
        role: req.body.role,
        mobile: req.body.mobile
    });
    userrout.save(function(err, useres) {
        if (err) return res.status(500).send("err ples try agin" + err);

        if (useres) {
            res.render('../views/pages/singup.ejs');
        }

    });

});




router.get('/public/css/login/fa40e0ff-3615-4be7-bb7f-4842398bdee1.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/login/fa40e0ff-3615-4be7-bb7f-4842398bdee1.jpeg'))
})
router.get('/public/css/login/back-arrow.png', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/css/login/back-arrow.png'))
})

router.get('/public/css/login/login.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/css/login/login.js'))
})

router.get('/public/css/woman.png', jsonParser, function(req, res) {
    res.sendfile(path.join(__dirname, '../public/css/woman.png'))
})
router.get('/public/css/singup.css', jsonParser, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/singup.css'))
});
router.get('/public/css/man.png', jsonParser, (req, res) => {
    res.sendfile(path.join(__dirname, '../public/css/man.png'))
})

router.get('/public/css/user-icon.png', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/css/user-icon.png'))
});

router.get('/public/css/singup.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/singup.jpg'))
});

router.get('/public/css/login/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/css/login/login.css'))
});
router.get('/public/css/Login-icon.png', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/Login-icon.png"))
})

module.exports = router