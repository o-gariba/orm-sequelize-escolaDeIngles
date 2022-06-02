const database = require('../models')

class Services {
    constructor(nomeDataBase) {
        this.nomeDataBase = nomeDataBase
    }

    async mostraTodosOsRegistros() {
        return database[this.nomeDataBase].findAll()
    }

    async pegaUmRegistro(id) {
        return {}
    }

    async criaRegistro(dados) {

    }

    async atualizaRegistro(id, dados) {

    }

    async deletaRegistro(id) {

    }
}

module.exports = Services