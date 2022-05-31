// import { Router } from "express";
const Router = require('express')
const PessoaControler = require('../api/controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaControler.pegaTodasAsPessoasAtivas)
    .get('/pessoas/todas', PessoaControler.pegaTodasAsPessoas)
    .get('/pessoas/:id/matriculas', PessoaControler.pegaMatriculasAtivasPorIdPessoa)
router.get('/pessoas/:idAbacate', PessoaControler.pegaUmaPessoa)
// O : indica que virá um parametro dpois
router.post('/pessoas', PessoaControler.criaPessoa)
router.delete('/pessoas/:id', PessoaControler.deletaPessoa)
router.put('/pessoas/:id', PessoaControler.atualizaDados)
router.get('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.pegaInfosPorMatriculaEIdPessoa)
    .post('/pessoas/:idPessoa/matriculas', PessoaControler.criaMatriculaParaPessoa)
    .put('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.alteraMatriculaPeloIdPessos)
    .delete('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.deletaMatriculaPorIdPessoa)
    .post('/pessoas/:id/restaurar', PessoaControler.restauraPessoa)

module.exports = router