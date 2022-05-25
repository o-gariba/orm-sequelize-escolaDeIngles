const express = require("express")
const bodyParser = require("body-parser")
const routes = require("../routes")

// Estou atribuindo a constante app todos os métodos do express
const app = express()

// Na linha de baixo, deixamos avisado para o express que quem vai fazer o meio de campo das requisições e respostas vai ser o bodyParser, que vai se comunicar via json
// app.use(bodyParser.json())

const porta = 3000

// cria rota de get, que recebe o nome da rota e a função callback com req e res
// app.get('/teste', (req, res) => {
//     res.status(200)
//         .send({ mensagem: 'API rodando com sucesso' })
// })

routes(app)

// recebe 2 parametros, a porta e uma função callback que roda enquanto ele ouve a rota (para sabermos que a porta está sendo usada sem problemas)
app.listen(porta, () => console.log(`servidor rodando na porta ${porta}`))
// Só aqui que eu sei qual porta estou usando?

// Instalamos o nodemon para agilizar nossa vida e ele reiniciar o servidor sempre que fizermos uma alteração e salvar nosso código!!

// Para mexermos com o mySql instalamos o sequelize, sequelize-cli (command line interface) e o path (para resolver as mudanças de diretório dos arquivos do sequelize)

// Rodamos um comando padrão para iniciarmos um projeto padrão com npx sequelize-cli init, que cria 4 pastas novas no diretorio do projeto. 
// MOVEMOS AS PASTAS config, migrations, models e seeders PARA DENTRO DA NOSSA PASTA API, QUE CONTINHA O index.js
// Dpois avisamos o sequelize que fizemos a alteração, com um novo arquivo .sequelizerc


// IMPORTANTEE! Preciso alterar as informações que vem default da pasta config.json da pasta config (sequelize), colocando os dados corretos do meu MySql

// Dpois fazemos a migração da tabela do sequelize para o mySql, com o seguinte comando:
// npx sequelize-cli db:migrate

// Para criarmos o arquivo que fará a primeira inserção de dados no BD rodamos um comando para gerar uma seed (para servir de base)
// npx sequelize-cli seed:generate --name <nomeQlq>

// Agora podemos alterar ali os dados que vão ser inseridos, tomando cuidado para não add o ID e ADICIONANDO 2 NOVOS CAMPOS, referentes a quando a inserção foi feita e quando foi atualizada. Dpois rodamos o comando:
// npx sequelize-cli db:seed:all

module.exports = app


// O que é MIGRAÇÃO em sql: mudar dados de lugar, entre plataformas. Dentro do projeto falamos de migração com ORM: alterações incrementais e rastreáveis no banco 

// PADRÃO MVC: Model, view, controller

/* 
    Fluxo de dados
            -- httpRequest ---> ROUTER ---- dados ---> 
    Usuário                                           CONTROLLER  ----> MODEL
             <----html json---  VIEW   <----dados---             <-----
*/

// Crio entao uma pasta controller para criar as classes necessárias, que são: PessoasController (com os métodos para realizar o CRUD, primeiro para pegar todos os dados, método static para que o método seja chamado sem precisar criar uma nova instancia da classe, async)

// Crio uma pasta para as rotas, com um index.js. Dentro do arquivo importo o bodyParser e crio uma arrow function que recebe app, usa o bodyParser.json() e tem um app.get('/', (req, res) => {...}) e vou limpando o index.js original (da aplicação que eu criei)

// Continuando a ideia de separar responsabilidades, dentro da pasta routes crio o pessoasRoute, chamando Router (express) e o PessoaControler. Aqui configuro que a rota '/pessoas' faz o get definido no PessoaControler. Como defini no controller o método como estático, não preciso declara uma nova instancia de PessoaController aqui
// Dou um module exports no router (instancia de Router)

// Dpois configuro o index.js mostrando que tenho uma nova rota definida no pessoasRoute, com app.use(pessoas), sendo pessoas o require('./pessoasRoute'). Posso excluir o get com '/' olá