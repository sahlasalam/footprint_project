const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    email : {type :String},
    password : {type : String},
    fname : {type : String},
    lname : {type : String},
    address : {type : String},
    number : {type : Number},
    country : {type : String},
    pincode : {type : Number} 
})

const User = mongoose.model("User", customerSchema)

module.exports = User;