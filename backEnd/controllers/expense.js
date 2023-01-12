const Expense = require('../models/expense')
const User = require('../models/userSignup')

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