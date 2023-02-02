const mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
    companyName:{
        type:String
    },
    Email:{
        type:String
    },
    GSTNo:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    State:{
        type:String
    },
    stateCode:{
        type:String
    },
    Address:{
        type:String
    }
});

module.exports = mongoose.model('Company',companySchema)