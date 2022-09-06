const router = require('express').Router()
const IdeaController = require('../controllers/IdeaController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', IdeaController.showIdeas)
router.get('/dashboard',checkAuth, IdeaController.dashboard)
router.get('/add', checkAuth, IdeaController.createIdea)
router.post('/add', checkAuth, IdeaController.createIdeaSave)
router.post('/remove', checkAuth, IdeaController.removeIdea)

module.exports = router