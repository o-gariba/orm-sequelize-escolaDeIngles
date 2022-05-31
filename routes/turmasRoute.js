const { Router } = require('express')
const TurmaController = require('../api/controllers/TurmaController')

const router = Router()

router
    .get('/turmas', TurmaController.pegaTodasAsTurmas)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .put('/turmas/:id', TurmaController.atualizaTurma)
    .delete('/turmas/:id', TurmaController.deletaTurma)
    .post('/turmas', TurmaController.criaTurma)
    .post('/turmas/:id/restaurar', TurmaController.restauraTurma)

module.exports = router