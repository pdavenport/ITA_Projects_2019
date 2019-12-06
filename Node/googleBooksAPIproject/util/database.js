const Sequelize = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;