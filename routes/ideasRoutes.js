const router = require('express').Router()
const IdeaController = require('../controllers/IdeaController')

router.get('/', IdeaController.showIdeas)

module.exports = router