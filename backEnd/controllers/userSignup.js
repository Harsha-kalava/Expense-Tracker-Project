
const User = require('../models/userSignup')


function isValidInput(str){
    if(str.length === 0 || str == undefined){
        return true
    }else{
        return false
    }
}
exports.addUser = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (isValidInput(name) || isValidInput(email) || isValidInput(password)) {
      res.status(500).json({ success: false, message: "empty fields" });
    } else {
      try {
        const data = await User.create({
          name: name,
          email: email,
          password: password,
        });
        res.status(201).json({ success: true, message: data });
      } catch (err) {
        res.status(500).json({ success: false, message: err });
      }
    }
  };
  

exports.checkUser = async (req,res,next) =>{
    const {email,password} = req.body
    // console.log(email,password)
    try{
        const checker =await User.findOne({where:{email:email}})
        if(checker){
            // console.log(checker.password)
            if(checker.password === password){
                return res.status(200).json({success:true,message:'User login successuful'})
            } 
            else{
                return res.status(401).json({success:false,message:'password not matched'})
            }        
        }
        else{
            res.status(404).json({success:false,message:'Not a user'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:'empty fields'})
    }
    
}