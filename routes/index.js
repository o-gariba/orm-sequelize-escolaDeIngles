const bodyParser = require('body-parser')
const pessoas = require('../routes/pessoasRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)
}