const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path');
const { resolve } = require('path');
const { rejects } = require('assert');


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
        return res.render('../views/pages/dashpord.ejs', { name: req.body.userName })
    }


});
//prmes
{
    //promes
    // //1
    // User.findOne({}, function(err, usere) {
    //     if (err) console.log(err);
    //     else console.log(usere);
    // });
    // //2
    // let promes = new Promise((resolve, rejects) => {
    //     User.findOne({}, function(err, usere) {
    //         if (err) rejects(err);
    //         else resolve(usere);
    //     });

    // });
    // promes.then(
    //         function(result) {
    //             console.log("result", result);
    //         },
    //         function(error) {
    //             console.log("error", error);
    //         }
    //     )
    //     //3 
    // router.get('/promes', async(req, res) => {
    //         const data = await Promise.resolve(User.findOne({}, (err, user) => {
    //             if (err) console.log(err);
    //             else console.log("3 proms" + user);
    //         }));
    //         return res.send(data);
    //     })
    //     //state

}
//hoka
// {

//     const userrout = new User({
//         firstname: "Aww",
//         lastname: "fwe",
//         userName: "ew2",
//         password: "dw2",
//         sex: "w2c",
//         role: "b2w",
//         mobile: "g2w"
//     });
//     userrout.save((err, user) => {
//         if (err) console.log(err);
//         else console.log(user);


//     })
// }


module.exports = router