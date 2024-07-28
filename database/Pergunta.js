const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false //campo nunca pode ser vazio

    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// se já existir não vai criar outra
Pergunta.sync({force:false});

module.exports = Pergunta;