const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const Article = require('./models/article')
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
    destination: './public/upload',
    filename: function(req, file, cd) {
        cd(null, file.originalname)
    }
});
const upload = multer({
    storage: storage
        // limits: {
        //     fileSize: 1000000
        // }

}).single('myimage')

app.post('/upload', function(req, res) {

        upload(req, res, (err) => {
            console.log(req.body);
            console.log(req.file);

            if (err) {
                res.render('index', {
                    msg: err

                })
            } else {
                const article = new Article({
                    username: req.body.username,
                    text: req.body.matn,
                    img: req.file.filename
                });
                article.save(function(err, articless) {
                    // console.log(articless);
                    if (err) {
                        res.send("ERRPR in images" + err)
                    } else {
                        return res.json(articless);

                    }
                })
            }
        });
    })
    //post upload






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