const express = require("express")
const router = express.Router()

const cors = require("cors");
const bodypars= require('body-parser')
router.use(cors());
router.use(bodypars.json())

 router.post('/register', async(req, res)=>{
    console.log(req.body);
    res.send("success")
 })

module.exports = router