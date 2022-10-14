const mongoose = require("mongoose");

const connectDb = async()=>{
    mongoose.connect("mongodb://localhost:27017/footprint_db",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connectDb;