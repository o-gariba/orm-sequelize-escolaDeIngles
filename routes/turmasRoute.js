const { Router } = require('express')
const TurmaController = require('../api/controllers/TurmaController')

const router = Router()

router
    .get('/turmas', TurmaController.pegaTodasAsTurmas)

module.exports = router