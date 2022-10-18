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

router.post('/fetch', async(req, res) =>{
    try{
        var token = req.body.token;
        jwt.verify(token, SECRETE_KEY, async function(err, decoded){
            if(decoded){
                var data = await User.findOne({_id : decoded.id})
                var output ={
                    fname : data.fname,
                    lname : data.lname,
                    email : data.email,
                    address : data.address,
                    number : data.number,
                    country : data.country,
                    pin : data.pin
                }
                res.send({status : 1, output : output})
            }
            else{
                res.send({status: 0})
            }
        })
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router