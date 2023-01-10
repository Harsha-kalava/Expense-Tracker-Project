const jwt = require('jsonwebtoken')
const User = require('../models/userSignup')

exports.authenticate = async(req,res,next)=>{
    try{
        const token = req.header('Authorization')
        const user = jwt.verify(token,'Harsha')
        User.findByPk(user.userId).then(user=>{
            req.user=user
            next()
        })
    }
    catch(err){
        console.log(err)
        res.status(401).json({success:false,message:'failed at auth.js'})
    }
}

