const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({

    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
    },
    img: {
        type: String
    }
});
module.exports = article = mongoose.model('article', Article)