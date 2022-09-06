const Idea = require('../models/Idea')
const User = require('../models/User')

module.exports = class IdeaController {
    static async showIdeas( _request, response) {
       response.render('ideas/home')
    }
    static async dashboard(_request, response) {
        response.render('ideas/dashboard')
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