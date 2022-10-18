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
        var token = req.body.token;
        jwt.verify(token, SECRETE_KEY, async function(err, decoded){
            if(decoded){
                  User.findByIdAndUpdate( decoded.id ,{$set:{
                    fname : req.body.data.fname,
                    lname : req.body.data.lname,
                    email : req.body.data.email,
                    address : req.body.data.address,
                    number : req.body.data.number,
                    country : req.body.data.country,
                    pin : req.body.data.pin
                }}, {new : true}, async function (err, log){
                    if(log){
                        // console.log(log);
                        res.send({status : 1, output : log, message : "Successfully Updated"})
                    }
                    else{
                        res.send({status : 0, message: "Please update"})
                    }
                })
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