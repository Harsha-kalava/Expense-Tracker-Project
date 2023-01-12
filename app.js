const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const sequelize = require('./backEnd/util/dataBase')
const User = require('./backEnd/models/userSignup')
const Expense = require('./backEnd/models/expense')
const Order = require('./backEnd/models/orders')

const userRoutes = require('./backEnd/routes/userSignup')
const expenseRoutes = require('./backEnd/routes/expense')
const premiumRoutes = require('./backEnd/routes/premium')

const app = express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.use(userRoutes)
app.use(expenseRoutes)
app.use(premiumRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync({alter:true})
.then((res)=>{
    app.listen(3000,()=>{
        console.log('app started running on 3000')
    })
})