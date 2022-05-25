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
}

module.exports = PessoaController