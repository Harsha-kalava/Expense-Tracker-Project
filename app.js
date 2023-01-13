const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const sequelize = require('./backEnd/util/dataBase')
const User = require('./backEnd/models/userSignup')
const Expense = require('./backEnd/models/expense')
const Order = require('./backEnd/models/orders')
const resetPassword = require('./backEnd/models/resetPassword')

const userRoutes = require('./backEnd/routes/userSignup')
const expenseRoutes = require('./backEnd/routes/expense')
const premiumRoutes = require('./backEnd/routes/premium')
const forgotRoutes = require('./backEnd/routes/password')

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.use(userRoutes)
app.use(expenseRoutes)
app.use(premiumRoutes)
app.use("/password",forgotRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(resetPassword)
resetPassword.belongsTo(User)

sequelize.sync({alter:true})
.then((res)=>{
    app.listen(3000,()=>{
        console.log('app started running on 3000')
    })
})