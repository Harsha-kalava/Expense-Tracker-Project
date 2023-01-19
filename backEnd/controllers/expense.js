const Expense = require('../models/expense')
const User = require('../models/userSignup')
const AWS = require('aws-sdk')

exports.addExpense = async (req,res)=>{
    try{
        const {price,desc,categ} = req.body
        const result =  await req.user.createExpense({price,desc,categ})
        res.status(201).json({newExpense:[result],message:'successful'})
    }
    catch(err){
        res.status(500).json({success:false,message:'unable to create expense table'})
    } 
}

exports.getExpense = async(req,res)=>{
    try{
        const id = req.user.id
        const ispremium = Number(req.user.ispremium)
        // console.log(req.user.ispremium,'consoling user')
        const expenseData = await Expense.findAll({where:{userId:id}})
        if(expenseData){
            return res.status(200).json({success:true,message:expenseData,premium:ispremium})
        }
    }
    catch(err){
        res.status(404).json({success:false,message:err})
    }
}

exports.delData = async(req,res)=>{
    try{
        const user  = req.user.id
        const listId = req.params.id
        const expense = await Expense.destroy({where:{id:listId,userId:user}})
        console.log(expense)
        res.status(200).json({message:'successfully deleted'})
          
    }
    catch(err){
        res.status(500).json({success:false,message:'unable to delete feilds'})
    }
}

exports.downloadExpense = async(req,res)=>{
    const userId = req.user.id
    try{
        const checkUserPremium = await User.findOne({where:{id:userId}})
        console.log(checkUserPremium.ispremium,'premium',typeof(checkUserPremium.ispremium))
        if(checkUserPremium.ispremium === '1'){
            const expenses = await Expense.findAll({where:{userId:userId}})
            const stringifiedExpenses = JSON.stringify(expenses)
            const fileName = `Expense${userId}/${new Date()}.txt`
            const fileURL = await uploadToS3(stringifiedExpenses,fileName)
            return res.status(201).json({fileURL,success:true})

        }else{
            throw new Error
        }
    }catch(err){
        return res.status(403).json({success:false,message:'Not a premium user(or) failed at S3',error:err})
    }        
}

function uploadToS3(data,fileName){  
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET
    })
    var params = {
        Bucket:process.env.BUCKET_NAME,
        Key:fileName,
        Body:data,
        ACL:'public-read'
    }
   return new Promise((resolve,reject)=>{
    s3bucket.upload(params,(err,s3response)=>{
        if(err){
            console.log('something went wrong',err)
            reject(err)
        }else{
            resolve(s3response.Location)
        }
    })
   })
}