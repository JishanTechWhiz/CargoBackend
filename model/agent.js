const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    fullName:{
        type:String
    },
    Email:{
        type:String
    },
    Username:{
        type:String,
    },
    Password:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    Gender:{
        type:String
    },
    State:{
        type:String
    },
    City:{
        type:String
    },
    officeAddress:{
        type:String
    },
    Date:{
        type:Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Agent',agentSchema);

