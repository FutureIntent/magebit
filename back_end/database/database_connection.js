const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.database_name,
    process.env.database_username,
    process.env.database_password,
    {
        host: process.env.database_host,
        dialect: process.env.database_dialect,
        port: process.env.database_port
    });

const sequelize_test = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, sequelize_test};