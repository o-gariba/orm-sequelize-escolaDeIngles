const database = require('../models')

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params
        try {
            const umNivel = await database.Niveis.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel(req, res) {
        const dadosNivel = req.body
        try {
            const nivelCriado = await database.Niveis.create(dadosNivel)
            return res.json(dadosNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy(
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

    static async restauraNivel(req, res) {
        const { id } = req.params

        try {
            await database.Niveis.restore(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json({mensagem: `O nível com id: ${id} foi restaurado no sistema`})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async atualizaDados(req, res) {
        const { id } = req.params
        const novosDados = req.body
        try {
            await database.Niveis.update(novosDados, {
                where: { id: Number(id) }
            })
            const nivelAtualizado = await database.Niveis.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message) 
        }
    }
}

module.exports = NivelController