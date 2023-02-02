const mongoose = require("mongoose");

var userSchema  = new mongoose.Schema({
    Fullname:{
        type: String,
        // required:[true, 'Please Enter Full Name.']
    },
    Phone:{
        type:String,
        // required:[true, 'Please Enter Phone Number.']
    },
    Email:{
        type:String,
        // required:[true, 'Please Enter Email Address.']
    },
    Password:{
        type:String,
        // required:[true, 'Please Enter Password']
    },
    ConfirmPassword:{
        type:String,
        // required:[true, 'Please Enter Password.']
    }
});

module.exports = mongoose.model('Data',userSchema)
