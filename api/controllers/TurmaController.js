const database = require('../models')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const turmaCriada = await database.Turmas.create(novaTurma)
            return res.json(turmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json(`Exclusão realizada com sucesso! O id ${id} não existe mais`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params

        try {
            await database.Turmas.restore(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json({mensagem: `A turma com id: ${id} foi restaurada no sistema`})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const dadosNovos = req.body
        try {
            await database.Turmas.update(dadosNovos, {
                where: {
                    id: Number(id)
                }
            })
            const novaTurma = await database.Turmas.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json(novaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController