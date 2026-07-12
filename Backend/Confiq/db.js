const { Sequelize } = require('sequelize');

const databaseUrl =
    process.env.DATABASE_URL ||
    process.env.DB_URL ||
    'mysql://root:LNBqYKjRfnZSiRWOCBCbAhxVDjOZHbqi@mainline.proxy.rlwy.net:41055/railway';

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
