const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required. Add it to your Backend/.env file or hosting environment.');
}

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
