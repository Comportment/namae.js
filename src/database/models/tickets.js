const { Sequelize } = require('sequelize');
const Database = require('../database');
const moment = require('moment');
const database = new Database();

const tickets = database.db.define('tickets', {
    userId: Sequelize.STRING,
    userName: Sequelize.STRING,
    ticketType: Sequelize.STRING,
    content: Sequelize.STRING(1800),
    date: {
        type: Sequelize.DATEONLY,
        get: function () {
            return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
        }
    }
});

tickets.sync();
module.exports = tickets;