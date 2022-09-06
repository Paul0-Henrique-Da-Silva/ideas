const router = require('express').Router()
const IdeaController = require('../controllers/IdeaController')

router.get('/', IdeaController.showIdeas)
router.get('/dashboard', IdeaController.dashboard)

module.exports = router