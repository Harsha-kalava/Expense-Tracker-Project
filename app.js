const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const sequelize = require('./backEnd/util/dataBase')
const User = require('./backEnd/models/userSignup')
const Expense = require('./backEnd/models/expense')

const userRoutes = require('./backEnd/routes/userSignup')
const expenseRoutes = require('./backEnd/routes/expense')


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes)
app.use(expenseRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync({alter:true})
.then((res)=>{
    app.listen(3000,()=>{
        console.log('app started running on 3000')
    })
})