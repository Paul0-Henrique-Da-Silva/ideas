const Idea = require('../models/Idea')
const User = require('../models/User')

module.exports = class IdeaController {
    static async showIdeas( _request, response) {
       response.render('ideas/home')
    }
    static async dashboard(request, response) {
        const userId = request.session.userid

        //verificar se usúario existe
        const user = await User.findOne({
            where: { id: userId },
            include: Idea,
            plain: true
        })
        // console.log(user.Ideas)
        if(!user) { response.redirect('/login') }
        
        const ideas = user.Ideas.map((value) => value.dataValues)
        // console.log(ideas)
         
        response.render('ideas/dashboard', { ideas })
    }

    static createIdea(_request, response) {
        response.render('ideas/create')
    }

    static async createIdeaSave(request, response) {
        const idea = { 
            title: request.body.title,
            UserId: request.session.userid
        }

        await Idea.create(idea)

        try {
            request.flash('message', 'Pensamento criado com sucesso!')
            request.session.save(() => {
                response.redirect('/ideas/dashboard')
            })} 
        catch (error) {
            console.log(error)
        }
    } 
}