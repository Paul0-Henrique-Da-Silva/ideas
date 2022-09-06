const Idea = require('../models/Idea')
const User = require('../models/User')

module.exports = class IdeaController {
    static async showIdeas( _request, response) {
       response.render('ideas/home')
    }
    static async dashboard(_request, response) {
        response.render('ideas/dashboard')
    }

    static createIdea(resquest, response) {
        response.render('ideas/create')
    }
}