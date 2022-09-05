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
        
        //password match validation
        if(password != confirmpassword) {
            // mensagem
            request.flash('message', 'As senhas não conferem, tente novamente')
            response.render('auth/register')
            return
        }
    }
}