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


 router.post('/register', async(req, res)=>{
   const hashedPassword = bcrypt.hashSync(req.body.password, 10)
   try{
      User.findOne({email : req.body.email}, async function(err, log){
         if(log){
            res.send({status : 0, message : "User already exist..please login"})
         }
         else{
            req.body.password = hashedPassword;
            const new_user = new User(req.body)
            new_user.save(async function(err, log){
               var token = jwt.sign({id : log._id, email : log.email}, SECRETE_KEY);
               res.send({status : 1, message: "Successfully registered", token : token})
            })
         }
      })
   }
   catch(err){
      console.log(err);
   }
 })

module.exports = router;