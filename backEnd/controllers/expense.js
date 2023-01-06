const Expense = require('../models/expense')
const User = require('../models/userSignup')

exports.addExpense = async (req,res)=>{
    try{
        const id = req.params.id
        const {price,desc,categ} = req.body
        console.log(price,desc,categ)
      // console.log(data)
        const userTable = await User.findOne({where:{email:id}})
        if(userTable){
            let userid = userTable.id
            const created = await Expense.create({
                price:price,
                desc:desc,
                categ:categ,
                userId:userid
            })
            return res.status(201).json({success:true,message:created})
        }
    }
    catch(err){
        res.status(500).json({success:false,message:'unable to create expense table'})
    } 
}

exports.getExpense = async(req,res)=>{
    try{
        const id = req.params.id
        // console.log(id,'id')
        const expenseData = await Expense.findAll({where:{userId:id}})
        if(expenseData){
            return res.status(200).json({success:true,message:expenseData})
        }
    }
    catch(err){
        res.status(404).json({success:false,message:err})
    }
}

exports.delData = async(req,res)=>{
    try{
        const user  = req.query.user
        const listId = req.query.li
        console.log(typeof(listId))
        console.log(user,listId)
        const findData = await Expense.findAll({where:{userId:user}})
      
        for(ele of findData){
            console.log(ele.id)
            if(ele.id === Number(listId)){
                const toDel = await Expense.destroy({where:{id:ele.id}})
                if(toDel){
                    return res.status(200).json({success:true,message:'successfully deleted'})
                } 
            }
        }
          
    }
    catch(err){
        res.status(500).json({success:false,message:'unable to delete feilds'})
    }
}