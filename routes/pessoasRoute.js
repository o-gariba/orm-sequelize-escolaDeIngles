// import { Router } from "express";
const Router = require('express')
const PessoaControler = require('../api/controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaControler.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaControler.pegaTodasAsPessoasAtivas)
    .get('/pessoas/:id/matriculas', PessoaControler.pegaMatriculasAtivasPorIdPessoa)
    .get('/pessoas/matriculas/:id/confirmadas', PessoaControler.pegaTodasAsMatriculasPorTurma)
    .get('/pessoas/matriculas/lotadas', PessoaControler.pegaTurmasLotadas)
    .get('/pessoas/:idAbacate', PessoaControler.pegaUmaPessoa)
    .get('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.pegaInfosPorMatriculaEIdPessoa)
    .post('/pessoas', PessoaControler.criaPessoa)
    .post('/pessoas/:idPessoa/matriculas', PessoaControler.criaMatriculaParaPessoa)
    .post('/pessoas/:id/restaurar', PessoaControler.restauraPessoa)
    .post('/pessoas/:id/cancela', PessoaControler.cancelaPessoaEMatriculas)
    .delete('/pessoas/:id', PessoaControler.deletaPessoa)
    .delete('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.deletaMatriculaPorIdPessoa)
    .put('/pessoas/:id', PessoaControler.atualizaDados)
    .put('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaControler.alteraMatriculaPeloIdPessos)

module.exports = router