const Sequelize = require("sequelize");
const connection = new Sequelize('guia_perguntas', 'root', 'henry77', {
    host: "localhost",
    dialect: "mysql",
    logging: false
})

module.exports = connection;