const { Sequelize } = require('sequelize');
const winston = require('winston');
const db = require('../../settings').db;

module.exports = class Database {

    constructor() {
        this.database = new Sequelize(db.database, db.username, db.password, {
            host: db.hostname,
            logging: db.logging,
            dialect: db.dialect
        });
    }

    get db() {
        return this.database;
    }

    init() {
        this.database.authenticate()
            .then(() => winston.info("Connected to Database server..."))
            .then(() => this.database.sync())
            .then(() => winston.info("Syncing databases.. Done!"))
            .catch((err) => winston.error("Unable to connect to database! Please check your settings!"))     
    }
    
}