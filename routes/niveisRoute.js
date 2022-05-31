const { Router } = require('express')
const NivelController = require('../api/controllers/NivelController')

const router = Router()

router
    .get('/niveis', NivelController.pegaTodosOsNiveis)
    .get('/niveis/:id', NivelController.pegaUmNivel)
    .post('/niveis', NivelController.criaNivel)
    .delete('/niveis/:id', NivelController.deletaNivel)
    .put('/niveis/:id', NivelController.atualizaDados)
    .post('/niveis/:id/restaurar', NivelController.restauraNivel)

module.exports = router