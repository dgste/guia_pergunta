const express = require("express");
const app = express();
const connection = require("./database/database")
const PerguntaModel = require('./database/Pergunta');
const RespostaModel = require('./database/Resposta');
const { where } = require("sequelize");
//database
connection
    .authenticate()
    .then(() => {
        console.log("Conectado Com Sucesso!")
    })
    .catch(() => {
        console.log("Erro Ao Se Conectar Com Banco!")
    })

//Estou dizendo para o express usar o ejs como view engine
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
    PerguntaModel.findAll({ raw: true, order: [
        ['id','DESC'] // ASC crescente | DESC descrescente, mesma logica para letras desc: zyx | asc: abc
    ] }).then(perguntas => {
        res.render("index", {
            perguntas
        })
    })
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    //recebo dados do formulario
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    //salvo no banco e redireciono para rota raiz
    PerguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    PerguntaModel.findOne({
        where: {id: id}
    }).then(perguntas => {

        if(perguntas != undefined){ //pergunta foi achada
        RespostaModel.findAll({
            where: {perguntaId: perguntas.id},
            order: [['id','DESC']]
        }).then(respostas => {
            res.render('pergunta', {
                perguntas: perguntas,
                respostas: respostas
            })
        })            
        }else{ //nao encontrada
            res.redirect('/')
        }
    })
})

app.post('/salvarresposta', (req, res) => {
    var resposta = req.body.corpo
    var perguntaId = req.body.pergunta
    RespostaModel.create({
        corpo: resposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId)
    })
})

app.listen(3080, () => console.log("O Servidor está rodando"))