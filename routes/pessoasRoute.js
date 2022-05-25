// import { Router } from "express";
const Router = require('express')
const PessoaControler = require('../api/controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaControler.pegaTodasAsPessoas)

module.exports = router