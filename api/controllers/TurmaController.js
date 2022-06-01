const { Op } = require('sequelize')
const database = require('../models')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {

        const { data_inicial, data_final } = req.query
        const validacoes = {}
        data_inicial || data_final ? validacoes.data_inicio = {} : null
        data_inicial ? validacoes.data_inicio[Op.gte] = data_inicial : null
        data_final ? validacoes.data_inicio[Op.lte] = data_final : null

        /**
         * como o validações foi idealizado?
         * 
         * {
         *  validacoes: {
         *      data_inicio: {
         *          [Op.gte]: dataRecebidaNaQuery,
         *          [Op.lte]: dataRece...
         *      } 
         *  }
         * }
         */
        
        try {
            const todasAsTurmas = await database.Turmas.findAll({ where: validacoes })
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