const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Idea = db.define("Idea", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
})
Idea.belongsTo(User) // ideas pertence um ususuario
User.hasMany(Idea) // e um usuario tem muitas ideas

module.exports = Idea;