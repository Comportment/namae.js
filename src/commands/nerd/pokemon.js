const { Command } = require('discord.js-commando');
const nerd = require('nerds');

module.exports = class HarryPotterCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nerd-pokemon',
            aliases: ['nerd-poke', 'pkn'],
            group: 'nerd',
            memberName: 'pokemon',
            description: '**Nerds**: A framework for generating data about favorite nerdy topics. Pokemon *nerds*',
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }

    async run(msg, args) {
        let POKEMON_JSON = JSON.stringify(nerd.resolve('Pokemon', 3)
                .include(['name', 'type', 'hp']).asArray(), null, 2);

        msg.say(POKEMON_JSON, { code: 'JSON' });
    }
}