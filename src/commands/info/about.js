const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const moment = require("moment");
const usage = require("usage");


const pkg = require('../../../package');

module.exports = class AboutCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'about',
			group: 'info',
			memberName: 'about',
			description: 'Displays information about the bot',
			throttling: {
				usages: 2,
				duration: 3
			},
			guildOnly: false
		});
	}

	async run(msg) {
		const pid = process.pid;
		usage.lookup(pid, (err, result) => {
			if (err) winston.error;

			msg.embed({
					color: 3447003,
					description: `About Namae v${pkg.version} [the legendary]`,
					fields: [
						{
							name: "❯ Developer",
							value: "🚀 Nomsy <me@nomsy.net>",
							inline: false
						},
						{
							name: "❯ CPU Usage",
							value: `${Math.round(result.cpu.toFixed(2))}%`,
							inline: true
						},
						{
							name: "❯ RAM Usage",
							value: `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024))} MB`,
							inline: true
						},
						{
							name: "❯ Swap Size",
							value: `${Math.round((process.memoryUsage().rss / 1024 / 1024).toFixed(2))} MB`,
							inline: true
						},
						{
							name: "❯ Bot Uptime",
							value: `${moment.duration(this.client.uptime).humanize()}`,
							inline: false
						}
					]
				});
			});
	}
}
