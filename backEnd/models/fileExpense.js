const Sequelize = require('sequelize');

const { DataTypes } = require('sequelize')
const sequelize = require('../util/dataBase')

const fileData = sequelize.define('file expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    URL:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = fileData