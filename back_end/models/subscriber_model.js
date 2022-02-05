const { DataTypes } = require('sequelize');
const { sequelize } = require('./../database/database_connection.js');

const Subscriber = sequelize.define('Subscriber', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = Subscriber;