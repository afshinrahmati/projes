const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//creat admin===>initinzshl.js1
const userschema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 30,
        minlength: 3,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 8
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'programer']

    },
    creatAT: {
        type: Date,
        required: true,
        default: Date.now
    }




})
module.exports = users = mongoose.model('users', userschema)