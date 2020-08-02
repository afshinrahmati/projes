const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const Auser = require('./models/users')
    //body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(cookieParser())



app.use(session({
    key: 'user_sid',
    secret: "somerisetuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    // console.log(req.cookies);
    // console.log(req.session);
    next();
})





//eroorha
app.use(function(err, req, res, next) {
    res.status(500).send('ssa' + err)
});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, "sasa.png")
    }
});
const uploadavata = multer({
    storage: storage

});

app.post('/upload', async(req, res) => {
        try {
            const upload = uploadavata.single("myimage")
            upload(req, res, async(err) => {
                console.log(req.body);
                console.log(req.file);

                if (err) {
                    console.log("err");
                    res.send('somthin moshkel')

                } else {
                    let article = await Auser.findByIdAndUpdate({ _id: "5f10066038f653219f02b1a2" }, { avatar: "sasa.png" }, { new: true });

                    if (!article) {
                        throw new Error("something went wrong")
                    }
                    res.json(article)

                }
            });

        } catch (error) {
            // console.log(error.message);
            res.send(error.message)

        }

    }) //post upload






const abirout = require('./router/abirouter');
app.use('/', abirout)

app.listen(3000, function() {
    console.log("it is ready:8080");
});

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/Final', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)