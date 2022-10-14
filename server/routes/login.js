const express = require("express")
const router = express.Router()

const cors = require("cors");
const bodypars= require('body-parser')
router.use(cors());
router.use(bodypars.json())

const db = require("../config/db")
const User = require("../model/model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

db();

SECRETE_KEY = "asdfghjklpoiuytree"

router.post('/login', async (req, res)=>{
    try{
        var data = await User.findOne({email : req.body.email})
            if(!data){
                res.send({status : 0, message : "User does not exist"})
            }
            else{
                var isMatched = await bcrypt.compare(req.body.password, data.password)
                if(!isMatched){
                    res.send({status : 0, message: "Incorrect password"})
                }else{
                    var token = jwt.sign({id : data._id, email : data.email}, SECRETE_KEY);
                    res.send({status : 1, token: token})
                }
            }
    }
    catch{

    }
})

module.exports = router;