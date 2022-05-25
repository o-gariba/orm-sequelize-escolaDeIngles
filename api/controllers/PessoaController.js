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

    static async deletaPessoa(req, res) {
        const idDesejado = req.params.id
        try {
            await database.Pessoas.destroy(
                {
                    where: {
                        id: Number(idDesejado)
                    }
                }
            )
            return res.json(`Exclusão realizada com sucesso! O id ${idDesejado} não existe mais`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaDados(req, res) {
        const { id } = req.params
        const novosDados = req.body

        try {
            await database.Pessoas.update(novosDados, {
                where: {
                    id: Number(id)
                }
            })
            const pessoaAtualizada = await database.Pessoas.findOne(
                {
                    where: { id: Number(id) }
                }
            )
            return res.json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController