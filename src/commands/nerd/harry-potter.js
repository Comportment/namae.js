const { Command } = require('discord.js-commando');
const nerd = require('nerds');

module.exports = class HarryPotterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nerd-hp',
            aliases: ['harrypotter', 'hpnerd'],
            group: 'nerd',
            memberName: 'harry-potter',
            description: '**Nerds**: A framework for generating data about favorite nerdy topics. Harry Potter *nerds*',
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }

    async run(msg, args) {
        let HP_JSON = JSON.stringify(nerd.resolve('Harry Potter').asArray(), undefined, 4);
        msg.say(HP_JSON, { code: 'JSON' });
    }
}