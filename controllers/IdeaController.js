const Idea = require('../models/Idea')
const User = require('../models/User')

module.exports = class IdeaController {
    static async showIdeas( _request, response) {
       response.render('ideas/home')
    }
}