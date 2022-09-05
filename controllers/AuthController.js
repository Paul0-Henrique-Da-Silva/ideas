module.exports = class  AuthControler {
    static login(request, response) {
        response.render('auth/login')
    }

    static register(request, response) {
        response.render('auth/register')
    }
}