const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
     firstname: {
         type: String,
         require: true,
         min: 3,
         max: 20,
         unique: false
     },

      lastname: {
         type: String,
         require: true,
         min: 3,
         max: 20,
         unique: false
     },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        min: 6
    },

    phone: {
        type: String,
       // unique: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    profilePicture: {
        type: String,
        default: ""
    },

    isAdmin:{
        type: Boolean,  // this is a Bolean character
        default: false  // by default  it will be false
    },

    about: {
        type: String,
    },

    country: {
        type: String,
        max: 50
    },

    city: {
        type: String,
        max: 50
    },

    education: {
        type: String,
        max: 50
    },

    followers: {
        type: Array,
        default: []
    },

    followings: {
        type: Array,
        default: []
    },

    languages: {
         type: String,
         max: 50
    },

    relationship: {
        type: Number, // this is a number character
        emum: [1, 2, 3]
   },
}, {timestamps: true})


module.exports = mongoose.model('users', userSchema)