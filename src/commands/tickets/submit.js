const { Command } = require('discord.js-commando');
const winston = require('winston');

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
			args: [
				{
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
        await statusMessage = msg.say('Submitting ticket...');

        // TODO: Actually submit a ticket.
    }
}