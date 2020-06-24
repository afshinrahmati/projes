const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path');


// const bodyParser = require("body-parser");
// let jsonParser = bodyParser.json();
//view
router.get('/singup', (req, res) => {
    res.render('../views/pages/singup.ejs')
});
//login
router.get('/login', (req, res) => {
    res.render('../views/pages/login.ejs');
});
router.get('/dash', (req, res) => {
    res.render('../views/pages/dashpord.ejs')
})


//create sing up
router.post('/record', async function(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.userName || !req.body.password) {
        return res.status(400).send("نام کابری در لیست میباشد لطفا نام دیگری انتخاب نمایید");
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
        sex: req.body.sex[0],
        role: req.body.role,
        mobile: req.body.mobile
    });

    userrout.save(function(err, useres) {
        if (err) return res.status(500).send("err ples try agin" + err);

        if (useres) {
            req.session.user = useres
            return res.status(200).send('شما با موفقیت ثبت نام شدید');
        }

    });

});
//create Login
router.post('/entrans', async(req, res) => {




    try {
        if (!req.body.userName || !req.body.password) {
            throw new Error('نام کاربی یا پسورد خالی است')
        };


        const blogger = await User.findOne({
            userName: req.body.userName,
            password: req.body.password
        });
        if (!blogger) {
            throw new Error('نام کاربری ثبت نام نکرده است')
        }

        req.session.user = blogger
        res.redirect('/dash')
    } catch (error) {
        res.render('.')
    }


})








module.exports = router