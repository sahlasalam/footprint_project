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

router.post('/password', async(req, res)=>{
    try{
        var token = req.body.token;
        var data = req.body.data;
        jwt. verify(token, SECRETE_KEY, async function (err, decoded){
            if(decoded){
                var user_data =await User.findOne({_id : decoded.id})
                var isMatched = await bcrypt.compare(data.currentpswd, user_data.password)
                if(!isMatched){
                    res.send({status : 0, message : "Password does not match"})
                }
                else{
                        const hashedPassword = bcrypt.hashSync(data.newpswd, 10)
                        User.updateOne({_id: decoded.id}, {$set: {
                        password : hashedPassword
                    }}, {new: true}, async function(err, log){
                        if(log){
                            res.send({status : 1, message : "Password successfully updated"})
                        }else{
                            res.send({status : 0, message : "Can't update the password"})
                        }
                    })
                }
            }
            else{
                res.send({status : 0, message : "Authentication Error"})
            }
        })    
    }
    catch(err){
        console.log(err);
    }
})

module.exports= router