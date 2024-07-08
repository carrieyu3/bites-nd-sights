const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    posts: {
        type: [postSchema],
        default: []
    }
});

var postSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    image : {
        type: String,
        require: false,
    },
    description : {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: false,
        default: Date.now
    }
});


const Userdb = mongoose.model('Userdb', userSchema);

module.exports = Userdb;