const { Command } = require('discord.js-commando');

module.exports = class TestCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'test',
            aliases: ['example'],
            group: 'utils',
            memberName: 'testcommand',
            description: 'a test command?',
            args: [{
                key: 'argument',
                prompt: 'what do you want?',
                type: 'string'
            }]
        });
    }

    async run(msg, args) {
        const message = await msg.reply('Wait for it...');
        message.edit(`*poof* now it's ${args.argument}!`);
    }
}