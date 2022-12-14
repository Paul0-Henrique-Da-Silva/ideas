const Idea = require('../models/Idea')
const User = require('../models/User')

const { Op }  = require('sequelize')

module.exports = class IdeaController {
    static async showIdeas( request, response) {
        let order = 'DESC'
        if(request.query.order === 'old') {
         order = 'ASC'
        } else { 
         order = 'DESC'
        }
       let search = ''
       if(request.query.search) { search = request.query.search }

       const ideasData = await Idea.findAll(
        {
        include: User,
        where: { title: {[Op.like]: `%${search}%`}},
        order: [['createdAt', order]]
        })
         
       const ideas = ideasData.map((value) => value.get({ plain:true}))
    //    console.log(ideas)
       let ideasQty = ideas.length
       
       //handlebars n reconhece 0 como falso
       if( ideasQty === 0) {
        ideasQty = false
       }

       response.render('ideas/home', { ideas, search, ideasQty })
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
        
        let emptyIdeas = false

        if(ideas.length === 0){
            emptyIdeas = true
        }

        response.render('ideas/dashboard', { ideas, emptyIdeas })
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

    static async removeIdea(request, response) {
        const id = request.body.id
        const UserId = request.session.userid
        try {
            await Idea.destroy({where: { id: id, UserId: UserId}})
            request.flash('message', 'Ideia removido com sucesso')
            request.session.save(() => {
                response.redirect('/ideas/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateIdea(request, response) {
        const id = request.params.id

        const ideas = await Idea.findOne({where: {id: id}, raw: true})
        // console.log(ideas)

        response.render('ideas/edit', { ideas })
    }

    static async updateIdeaSave(request, response) {
        
        const id = request.body.id
        const ideas = { title: request.body.title }
        try {
            await Idea.update(ideas, {where: {id: id}})
            console.log(Idea)
            request.flash('message', 'Ideia atualizada!')
            request.session.save(() => {
                response.redirect('/ideas/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}