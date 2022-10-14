const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    email : {type :String},
    password : {type : String}
})

const User = mongoose.model("User", customerSchema)

module.exports = User;