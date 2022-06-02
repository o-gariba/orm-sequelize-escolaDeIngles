const Services = require("./Services");
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDataBase].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDataBase]
            .scope('todas')
            .findAll({ where: { ...where } })
    }
}

module.exports = PessoasServices