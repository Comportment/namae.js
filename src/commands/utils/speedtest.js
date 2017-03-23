const { Command } = require('discord.js-commando');
const speedtest = require('speedtest-net')();
const winston = require('winston');

module.exports = class SpeedtestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'speedtest',
            aliases: ['speed-test', 'speed'],
            group: 'utils',
            memberName: 'speedtest',
            description: 'Test my internet speed.',
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    async run(msg, args) {
        let _speedtest = await msg.reply('Gathering data...');
        let upload = await msg.say('Upload speed: N/a');
        let download = await msg.say('Download Speed: N/a');

        speedtest.on('downloadprogress', progress => {
            winston.info(`Download Progress: ${progress}%`);
        }).on('uploadprogress', progress => {
            winston.info(`Upload Progress: ${progress}%`);
        }).on('error', err => {
            msg.reply('An error has occured. ', err);
        }).on('downloadspeed', speed => {
            download.edit(`Download Speed: ${(speed*125).toFixed(2)} KB/s`);
        }).on('uploadspeed', speed => {
            upload.edit(`Upload Speed: ${(speed*125).toFixed(2)} KB/s`);
        }).on('result', url => {
            _speedtest.edit('Speedtest successful!');
        });
    }
}