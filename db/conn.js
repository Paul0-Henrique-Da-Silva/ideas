const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ideas', 'root', '9383',{
 host: 'localhost',
 dialect: 'mysql'
}) 

try {
    sequelize.authenticate()
    console.log('Conectado ao Banco')
} catch (error) {
    console.log('Erro ao conectar ao Banco', error)
}

module.exports = sequelize