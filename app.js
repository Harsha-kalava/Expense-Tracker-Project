const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const sequelize = require('./backEnd/util/dataBase')
const User = require('./backEnd/models/userSignup')
const userRoutes = require('./backEnd/routes/userSignup')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(userRoutes)

sequelize.sync()
.then((res)=>{
    app.listen(3000,()=>{
        console.log('app started running on 3000')
    })
})