const { Command } = require('discord.js-commando');
const { RichEmbed} = require('discord.js');
const { oneLine } = require('common-tags');

const moment = require('moment');
const winston = require('winston');
const ticketModel = require('../../database/models/tickets');
const config = require('../../../settings');

module.exports = class SubmitCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'submit',
            aliases: ['new-ticket', 'report', 'bug-report'],
            group: 'tickets',
            memberName: 'submit',
            description: 'Submit a ticket / feature request / bug report.',
            guildOnly: false,
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [{
                    key: 'reportType',
                    prompt: 'What type of report are you submitting? (feature, bug, general)',
                    type: 'string'
                },
                {
                    key: 'reportMessage',
                    prompt: 'What are you reporting?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
        let ticket = {
            userId: msg.author.id,
            username: `${msg.author.username}#${msg.author.discriminator}`,
            ticketType: args.reportType,
            message: args.reportMessage
        };

        this.submitTicket(ticket);
        this.sendTicketMessage(ticket, msg);
    }

    ticketMessage(data) {
        return data.message;
    }

    ticketUserId(data) {
        return data.userId;
    }

    ticketUsername(data) {
        return data.username;
    }

    ticketType(data) {
        return data.type;
    }

    ticketData(data) {
        return {
            userId: data.userId,
            username: data.username,
            type: data.ticketType,
            message: data.message
        }
    }

    submitTicket(data) {
        let ticket = this.ticketData(data);
        return ticketModel.create({
            userId: this.ticketUserId(ticket),
            userName: this.ticketUsername(ticket),
            ticketType: this.ticketType(data),
            content: this.ticketMessage(ticket)
        }).catch((e) => {
            winston.error(`Error occured! ${e}`);
        });
    }

    sendTicketMessage(data, message) {
        if (config.tickets.reportToChannel == true) {
            let ticket = this.ticketData(data);
            const embed = new RichEmbed()
                .setAuthor(`${this.ticketUsername(ticket)}`, message.author.avatarURL)
                .setColor(0x00AE86)
                .setDescription(`**Content**: ${this.ticketMessage(ticket)}`)
                .setFooter(`${moment().tz('America/New_York').format('LTS')} | Type: ${this.ticketType(ticket)}`);
            this.client.channels.get(config.tickets.channelId).sendMessage(embed);
            message.reply('Ticket submitted!');
        } else {
            message.reply('Ticket submitted, it will be viewed on our panel/system.');
        }
    }
}
