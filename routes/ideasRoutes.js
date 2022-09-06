const router = require('express').Router()
const IdeaController = require('../controllers/IdeaController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', IdeaController.showIdeas)
router.get('/dashboard',checkAuth, IdeaController.dashboard)

module.exports = router