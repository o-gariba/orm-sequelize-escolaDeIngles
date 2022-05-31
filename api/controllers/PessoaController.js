const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoasAtivas(req, res) {
        try {
            const pessoasPegas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasPegas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const pessoasPegas = await database.Pessoas.scope('todas').findAll()
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

    static async restauraPessoa(req, res) {
        const { id } = req.params

        try {
            await database.Pessoas.restore(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            return res.json({mensagem: `A pessoa com id: ${id} foi restaurada no sistema`})
        } catch (error) {
            return res.status(500).json(error)
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
    
    static async pegaMatriculasAtivasPorIdPessoa(req, res) {
        const { id } = req.params

        try {
            const pessoa = await database.Pessoas.findOne(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.json(matriculas)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async pegaInfosPorMatriculaEIdPessoa(req, res) {
        const { idPessoa, idMatricula } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne(
                {
                    where: {
                        id: Number(idMatricula),
                        estudante_id: Number(idPessoa)
                    }
                }
            )
            return res.json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async criaMatriculaParaPessoa(req, res) {
        const { idPessoa } = req.params
        const dadosDaMatricula = req.body

        try {
            const matriculaCriada = await database.Matriculas.create(
                {
                    ...dadosDaMatricula,
                    estudante_id: Number(idPessoa)
                }
            )
            return res.json(matriculaCriada)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async alteraMatriculaPeloIdPessos(req, res) {
        const { idPessoa, idMatricula } = req.params
        const novosDados = req.body

        try {
            await database.Matriculas.update(novosDados, {
                where: {
                    id: Number(idMatricula),
                    estudante_id: Number(idPessoa)
                }
            })
            const matriculaAlterada = await database.Matriculas.findOne({
                where: {
                    id: Number(idMatricula)
                }
            })

            return res.json(matriculaAlterada)
        } catch (error) {
            res.status(500).json(error)            
        }
    }

    static async deletaMatriculaPorIdPessoa(req, res) {
        const { idMatricula } = req.params

        try {
            await database.Matriculas.destroy(
                {
                    where: {
                        id: Number(idMatricula)
                    }
                }
            )
            return res.json(`Exclusão realizada com sucesso! O id ${idMatricula} não existe mais`)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = PessoaController