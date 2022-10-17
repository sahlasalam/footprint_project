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
                res.send({status : 1, email: decoded.email})
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