const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class  AuthControler {
    static login(_request, response) {
        response.render('auth/login')
    }

    static register(_request, response) {
        response.render('auth/register')
    }

    static async registerPost(request, response) {
        const { name, email, password, confirmpassword } = request.body
         
        //checar se usúario existe
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists) { 
            request.flash('message', 'O e-mail já está em uso!')
            response.render('auth/register')
            return }
        
        //password match validation
        // mensagem
        if(password != confirmpassword) {
            request.flash('message', 'As senhas não conferem, tente novamente')
            response.render('auth/register')
            return }
        // creaar password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = { name, email, password: hashedPassword}
        try {
            const  createdUser = await User.create(user)
            request.session.userid = createdUser.id // inicializando session
            request.flash('message', 'Cadastro realizado com sucesso!')
            request.session.save(() => { 
                response.redirect('/')
            })
        } catch (error) {
            console.log(error)   
        }
            

    }
}