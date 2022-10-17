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

SECRETE_KEY = "asdfghjklpoiuytree"

db();


router.post('/savedetails', async(req, res)=>{
    try{
        // console.log(req.body.data.fname);
        var token = req.body.token;
        jwt.verify(token, SECRETE_KEY, async function(err, decoded){
            if(decoded){
                User.updateOne({id : decoded.id},{$set:{
                    fname : req.body.data.fname,
                    lname : req.body.data.lname,
                    email : req.body.data.email,
                    address : req.body.data.address,
                    number : req.body.data.number,
                    country : req.body.data.country,
                    pincode : req.body.data.pin
                }})
            }
            else{
                res.send({status: 0, message : "user does not exist"})
            }
        })
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router;