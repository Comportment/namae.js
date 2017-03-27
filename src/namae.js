global.Promise = require('bluebird');

// Dependencies
const path = require('path');
const config = require('../settings.json');
const ticket = require('./database/models/tickets.js');
const winston = require('winston');
const sqlite = require('sqlite');

const { oneLine } = require('common-tags');
const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando');

module.exports = class Namae {
    
    /**
     * Client constructor
     */
    constructor() {
        this.client = new CommandoClient({
            owner: config.owners,
            commandPrefix: config.prefix,
            disableEveryone: true,
            unknownCommandResponse: false
        });
        this.client
            .on('error', (err) => winston.error(`${err}`))
            .on('warn', () => winston.warn)
            .once('ready', () => {
                winston.info(`Bot ready. Logged in as ${this.client.user.username}#${this.client.user.discriminator}`)
            })
            .on('disconnect', () => winston.warn('Bot disconnected.'))
            .on('reconnect', () => winston.warn('Reconnecting to Discord...'))

            .on('commandRun', (command, promise, message, args) => {
                winston.info(oneLine`
                    Command ${command.memberName}(${command.groupID}) triggered by 
                    ${message.author.username}#${message.author.discriminator} in 
                    ${message.guild ? `${message.guild.name}` : 'Private Message'}.
                `);
            })
            .on('commandError', (command, error) => {
                if (error instanceof FriendlyError)
                    return;

                winston.info(oneLine`
                    error found in ${command.memberName}(${command.groupID})
                `, error);

                ticket.create({
                    userId: '1',
                    userName: 'self',
                    ticketType: 'bug report',
                    content: error
                });
            })
            .on('message', async message => {
                if (message.channel.type === 'dm') return;
		        if (message.author.bot) return;

                winston.info(oneLine`
                    <${message.author.username}#${message.author.discriminator}>
                     ${message.content}
                `)
            })
            .on('debug', winston.info);

        this.client.setProvider(sqlite.open(path.join(__dirname, 'data.db'))
                .then(db => new SQLiteProvider(db)))
                .catch(err => winston.error(err));

        this.client.registry
            .registerGroups(config.commandGroups)
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname, 'commands'));

    }

    /**
     * Client getter
     */
    get bot() {
        return this.client;
    }

    /**
     * Client initilizer
     */
    init() {
        this.client.login(config.token);
        process.on('unhandledRejection', (err) => {
            winston.error(`Uncaught Promise: \n${err.stack}`);
        });
    }
}
