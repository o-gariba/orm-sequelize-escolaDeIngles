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

// Até o momento temos o R do CRUD (read)

// Vamos criar no PessoasController um novo get para uma pessoa específica (id), p sequelize tem um método especifico pra isso o .findOne( { where: { id: Number(idRequerido) } } )

// Agora vamos criar uma requisição de inscrição (C do CRUD) criaPessoa, dentro do PessoaController. Onde vai essas infos da pessoa a ser criada? Params no postman req.body
// No Postman, em body, selecionamos raw json e criamos um objeto com as seguintes chaves: nome, ativo, email e role (o id e as datas de criação e atualização são automáticas)

// Terminando o CRUD falta o U (update) e o D (delete)

// Para o update, vamos fazer um envio de dados no Postman e um id na url (requisição) para saber onde vamos corrigir. Uma diferença para outros métodos é que o update retorna true ou false, não um objeto inserido, por exemplo. Para retornar o registro atualizado fazemos um findOne com o id da pessoa atualizada
// No postman e no pessoasRoute definimos o verbo como .put

// Para deletar é mais fácil, pois só precisamos passar o id na url (req) e devolve uma mensagem customizada dizendo qual era o id. O metódo do sequelize para fazer uma exclusão é o .destroy( { where: { id: ...}})
// O nome do método no pessoasRoute é .delete()

// Agora vamos criar as demais tabelas do esquema pronto, a próxima a ser criada vai ser a tabela que NÃO TEM FK (chave estrangeira), a tabela Niveis
// npx sequelize-cli model:create --name Niveis --attributes descricao_nivel:string 

// Dpois vamos criar a tabela Turma, que fornece uma chave para a tabela ainda não criada.
// npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly

// Agora criamos a tabela Matricula, que usa chaves de todas as outras planilhas, cujo unico atributo natural é o status
// npx sequelize-cli model:create --name Matriculas --attributes status:string

// Curiosidade, as migrações vao ser rodadas na ordem de criação de cada uma, por isso os arquivos tem a especificidade do momento de criação. Por isso é importante entender a ordem de criação das tabelas referentes a quais chaves estrangeiras cada uma usa.

// Agora precisamos pensar em como serão as associações entre cada tabela, e o sequelize tem métodos específicos para isso. Essas anotações ficam nos arquivos de MODELOS (o sequelize deixa um comentário no local que vamos escrever as relações)

// Em pessoas criamos relação .hasMany() para models.Turmas e models.Matriculas. Obrigatoriamente precisamos usar .belongsTo()

// Em níveis, hasMany model.Turmas

// Turmas hasMany model.Matriculas. Turmas.belongsTo(models.Pessoas) e .Niveis

// Matriculas belongsTo() Pessoas e Turmas

// No msm método que falamos a relação entre tabelas colocamos um segundo parametro para falar qual será a chave estrangeira (fk) 
// { foreignKey: 'nome' }

// Agora precisamos informar nas tabelas quais serão as origens das fk's. Para isso, vemos todas as fk's declaradas nos hasMany, copiamos e colamos nos belongs to referenciados inicialmente

// Na pasta migrations colocamos na mão as colunas que mencionamos anteriormente, que conecta as tabelas (fk). Colocamos, no local que quisermos:
/* 
        <nome_coluna>: {
                allowNull: false,
                type: Sequelize.Integer (pois todos os id's são números, nosso exemplo)
                references: {
                        model:'<nomeDaTabelaReferenciada>', 
                        key: 'id'
                }
        }
*/

// No arquivo migrations>turmas coloco: docente_id e nivel_id

// Em matriculas coloco: estudante_id e turma_id

// Agora sim posso rodar as migrações no terminal
// npx sequelize-cli db:migrate

// Precisamos agora criar controladores e rotas para popular as tabelas e usar as funçoes do CRUD. Vamos usar novamente o sequelize-cli para gerar seeds
// npx sequelize-cli seed:generate --name demo-nível
// ... demo-turmas
// ... demo-matriculas

// dpois de popular os seeders, posso rodar o comando
// npx sequelize-cli db:seed:all

/* 

Definimos agora os arquivos controller e routes para os níveis e as turmas (pq só os dois?)

Para as matrículas temos um caso especial, pois eles precisam partir de uma pessoa, não faz sentido acessar matriculas especificas (id pessoa e id matricula). Ex:

> > {{local}}/pessoas/3/matriculas/2

Vamos criar agora o método de criar nova matrícula, pegando o ID da pessoa pela URL, os demais dados (status e turma_id) pelo body e fazer a junção usando spread operator.

Faltou criar uma rota para alteração e outra para exclusão, muito similares as rotas já criadas

*/

// INICIO DO CURSO PARTE 2

/* 
        Precisamos mudar uma linha nos modelos das tabelas para fazer o soft delete (paranoid, pelo sequelize)
        
        Vamos add uma nova coluna na tabela pessoas, para funcionar como um soft delete (indicar que a pessoa foi deletada sem remover ela permanentemente do bd), para isso, criamos um novo migrattion table de pessoas com a data atual, na mão, e no lugar de createTable usamos o método .addColumn('Pessoas', 'deletedAt', {<parametros da coluna>})

        a nova coluna vai ser:
        - allownull: true,
        - type: Sequelize.DATE

        (do down tmb menciono a coluna nova como um 2o parametro)

        faço isso em todas as demais tabelas e dpois rodo o comando:
        npx sequelize-cli db:migrate
        
        Dpois posso deletar e ver se deu certo (postman não mostra os soft deletes)


        No controllerPessoa vamos criar um método para restaurar uma pessoa, o método vai usar o .restore, passando o id necessário para fazer o restore.
        Dpois crio uma rota com .../pessoas/:id/restaura

        Escopos no sequelize serve para utilizarmos "filtros", definindo quai registros podem aparecer ou não. Para aparecerem apenas as pessoas ativas, posso fazer um defaultScope no model pessoa, definimos essa propriedade após o paranoid 

        Para add um segundo escopo, definimos, no msm local do defaultscope:
        scopes: {
                todos: { where: {} },
                // etc ...
        }

        Para usarmos os scopes definimos novas regras no controller. no get default vamos renomear para pegaPessoasAtivas, e no novo método, que agora sim é um pegaTodasAsPessoas, a diferença agora é que definimos:
        .... await = adatabase.Pessoas.scope('todos').findAll(....)

        Existe um comando no mysql CHECK, que faz uma espécie de ENUM (defini os inputs válidos, validations e constrains no sequelize). O sequelize tem inclusive uma validação para e-mail já pronta.

        No modelo da tabela, ao inves de ter somente datatype, escrevemos:
        ...
        email: { 
                type: DataTypes.STRING,
                validate: {
                        funcaoValidadora: function(dado){
                                if(dado.length < 3) throw new Error('o campo deve ter ....')
                        }
                        isEmail: {
                                args: true,
                                msg: 'dado do tipo e-mail inválido'
                        }
                }
        },

        Escopo de associação: na associação definida no modelo das tabelas podemos passar uma instrução para cruzar dados. Dentro do:
         Pessoas.hasMany(..Matriculas...) {
                ....
                scope: { status: confirmado },
                as: 'aulasMatriculadas'
        }

        Dpois precisamos terminar de configurar a nova busca no controller de pessoas

        Vamos criar um método no pessoasController para pegar todas as matrículas de uma pessoa, a partir da id da pessoa. No findOne o parametro de busca é o id estudante e usamos um getter (getAulasMatriculadas) gerado no scopo do modelo pessoas. Uma nova rota vai ser criada

        Usando operadores do MySQL e do Sequelize: no controller turma importo o Sequelize e o Op (operadores do sequelize). Dentro do método do findAll agora passo uma validação. As datas descritas para fazer a validação vão vir do req.query

        definimos o nome dos parametros que virão da URL (queries), passando o msm nome na url. Usaremos os operadores Op.gte e Op.lte (maior ou igual a, menor ou igual a)

        Fazemos tmb uma validação prévia, usando ternário para 

        Agora vamos verificar o número de matrículas por turma, dpois fazer uma validação de limite de matriculas em uma turma

        Faremos um novo método de get, usando um método do sequelize .findAndCountAll( { where: { turma_id: Number(id), status: 'confirmado' } })

 */