const User = require('../models/userSignup')

exports.addUser = (req,res,next)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // console.log(name,email,password)

    User.create({
        name:name,
        email:email,
        password:password
    })
    .then((data)=>{
        res.status(201).json({success:"true",message:data})
    })

}