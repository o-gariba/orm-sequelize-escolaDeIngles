const express = require("express")
const bodyParser = require("body-parser")

// Estou atribuindo a constante app todos os métodos do express
const app = express()

// Na linha de baixo, deixamos avisado para o express que quem vai fazer o meio de campo das requisições e respostas vai ser o bodyParser, que vai se comunicar via json
app.use(bodyParser.json())

const porta = 3000

// cria rota de get, que recebe o nome da rota e a função callback com req e res
app.get('/teste', (req, res) => {
    res.status(200)
        .send({ mensagem: 'API rodando com sucesso' })
})
// DÚVIDA: Como o meu navegador sabe que estou mandando essa resposta na porta 3000?

// recebe 2 parametros, a porta e uma função callback que roda enquanto ele ouve a rota (para sabermos que a porta está sendo usada sem problemas)
app.listen(porta, () => console.log(`servidor rodando na porta ${porta}`))
// Só aqui que eu sei qual porta estou usando?

// Instalamos o nodemon para agilizar nossa vida e ele reiniciar o servidor sempre que fizermos uma alteração e salvar nosso código!!

// Para mexermos com o mySql instalamos o sequelize, sequelize-cli (command line interface) e o path (para resolver as mudanças de diretório dos arquivos do sequelize)

// Rodamos um comando padrão para iniciarmos um projeto padrão com npx sequelize-cli init, que cria 4 pastas novas no diretorio do projeto. 
// MOVEMOS AS PASTAS config, migrations, models e seeders PARA DENTRO DA NOSSA PASTA API, QUE CONTINHA O index.js
// Dpois avisamos o sequelize que fizemos a alteração, com um novo arquivo .sequelizerc

// Comando para criar uma nova tabela no sequelize: npx sequelize-cli model:create --name <NomeDaTabela> --attributes <atributo>:<tipoDeDado>,<atributo2>:<tipoDeDado>,...

// IMPORTANTEE! Preciso alterar as informações que vem default da pasta config.json da pasta config (sequelize), colocando os dados corretos do meu MySql

// Dpois fazemos a migração da tabela do sequelize para o mySql, com o seguinte comando:
// npx sequelize-cli db:migrate

module.exports = app


// O que é MIGRAÇÃO em sql: mudar dados de lugar, entre plataformas. Dentro do projeto falamos de migração com ORM: alterações incrementais e rastreáveis no banco 