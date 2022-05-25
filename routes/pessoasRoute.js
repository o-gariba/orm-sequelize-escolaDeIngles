// import { Router } from "express";
const Router = require('express')
const PessoaControler = require('../api/controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaControler.pegaTodasAsPessoas)
router.get('/pessoas/:idAbacate', PessoaControler.pegaUmaPessoa)
// O : indica que virá um parametro dpois
router.post('/pessoas', PessoaControler.criaPessoa)
router.delete('/pessoas/:id', PessoaControler.deletaPessoa)

module.exports = router