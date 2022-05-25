const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const pessoasPegas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasPegas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const idDesejado = req.params.idAbacate
        try {
            const umaPessoa = await database.Pessoas.findOne(
                {
                    where: {
                        id: Number(idDesejado)
                    }
                }
            )
            return res.status(200).json(umaPessoa)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async criaPessoa(req, res) {
        const dadosNovaPessoa = req.body
        try {
            const pessoaCriada = await database.Pessoas.create(dadosNovaPessoa)
            return res.json(pessoaCriada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController