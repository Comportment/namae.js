const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server-info',
			aliases: ['server'],
			group: 'info',
			memberName: 'server',
			description: 'Get info on the server.',
			details: `Get detailed information on the server.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		return msg.embed({
			color: 3447003,
			description: `**${msg.guild.name}** Information`,
			fields: [
				{
					name: '❯ Channels',
					value: stripIndents`
						- ${msg.guild.channels.filter(ch => ch.type === 'text').size} [text], ${msg.guild.channels.filter(ch => ch.type === 'voice').size} [voice]
						- Default: ${msg.guild.defaultChannel}
					`,
					inline: true
				},
				{
					name: '❯ Member',
					value: stripIndents`
						- ${msg.guild.memberCount} members
						- Owner: ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}
						(ID: ${msg.guild.ownerID})
					`,
					inline: true
				},
				{
					name: '❯ Other',
					value: stripIndents`
						- Roles: ${msg.guild.roles.size}
						- Region: ${msg.guild.region}
						- Created at: ${moment.utc(msg.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
					`
				}
			],
			thumbnail: { url: msg.guild.iconURL }
		});
	}
}
