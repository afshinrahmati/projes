const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path');
const { resolve } = require('path');
const { rejects } = require('assert');
const { get } = require('http');


// const bodyParser = require("body-parser");
// let jsonParser = bodyParser.json();
//home
router.get('/', (req, res) => {
        res.render('../views/pages/home.ejs')
    })
    //view
router.get('/singup', (req, res) => {
    res.render('../views/pages/singup.ejs')
});
//login
router.get('/login', (req, res) => {
    res.render('../views/pages/login.ejs');
});
//view dashboard
router.get('/dash', (req, res) => {

        res.render('dashpord', { name: req.session.user.userName, file: `${req.session.user.userName}.jpg` });

    })
    //image


//create sing up
router.post('/record', async function(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.userName || !req.body.password) {
        return res.send("نام کابری در لیست میباشد لطفا نام دیگری انتخاب نمایید");
    }

    const us = await User.findOne({
        userName: req.body.userName
    });
    if (us) {
        return res.status(400).send("نام کابری در لیست میباشد لطفا نام دیگری انتخاب نمایید");
    }
    const userrout = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        userName: req.body.userName,
        password: req.body.password,
        sex: req.body.sex,
        role: req.body.role,
        mobile: req.body.mobile
    });
    userrout.save(function(err, useres) {
        console.log(useres);
        if (err) return res.send("err ples try agin");
        else {
            return res.json(useres);
        }
    });
});




//create Login
router.post('/entrans', async(req, res) => {
    if (!req.body.userName || !req.body.password) {
        return res.send("you are not sign up")
    };

    let blogger = await User.findOne({
        userName: req.body.userName,
        password: req.body.password
    });
    if (!blogger) {
        return res.status(400).send("شما ثبت ام نکرده اید!")
    } else {
        req.session.user = blogger
        return res.redirect('/dash')
    }

});

router.get('/article', (req, res) => {
    res.json(true);
})

module.exports = router