const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense','root','Backend@10LPA',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize