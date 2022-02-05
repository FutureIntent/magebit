const { DataTypes } = require('sequelize');
const { sequelize } = require('./../database/database_connection.js');

const Email_list = sequelize.define('Email_list', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uniqueEmail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = Email_list;