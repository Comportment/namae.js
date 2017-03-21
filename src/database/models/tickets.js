const { Sequelize } = require('sequelize');
const Database = require('../database');
const database = new Database();

const tickets = database.db.define('tickets', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    userId: Sequelize.STRING,
    userName: Sequelize.STRING,
    ticketType: Sequelize.STRING,
    content: Sequelize.STRING(1800)
});

tickets.sync();
module.exports = tickets;