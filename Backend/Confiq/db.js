// Config/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:kTmYOWfuKbpBFjGCcMyDLLWRQgkhucnb@hayabusa.proxy.rlwy.net:20195/railway', {
    dialect: 'mysql'
});

module.exports = sequelize;