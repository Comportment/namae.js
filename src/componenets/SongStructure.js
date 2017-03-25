const { escapeMarkdown } = require('discord.js');
const { oneLineTrim } = require('common-tags');
const config = require('../../settings');

module.exports = class SongStructure {
    constructor(video, member) {
        this.name = escapeMarkdown(video.title);
        this.id = video.id,
        this.length = video.durationSeconds ? parseInt(video.durationSeconds) : parseInt(video.duration)/1000l
        this.member = member;
        this.dispather = null;
        this.isPlaying = false;
    }
    get url() {
        if (isNaN(this.id)) return `https://www.youtube.com/watch?v=${this.id}`;
    }
    get username() {
		return escapeMarkdown(`${this.member.user.username}#${this.member.user.discriminator} (${this.member.user.id})`);
    }
    get thumbnail() {
        return  `https://img.youtube.com/vi/${this.id}/mqdefault.jpg`;
    }
    get avatar() {
        return this.member.user.displayAvatarURL;
    }
    get lengthOfSong() {
        return this.constructor.timeString(this.length);
    }
    timeLeftInSong(currentTime) {
        return this.constructor.timeString(this.length-currentTime);
    }
    toString() {
        return `${this.name} (${this.lengthOfSong})`;
    }
    static timeConstructor(sec, forceHrs = false) {
        const hrs = Math.floor(sec/3600);
        const min = Math.floor(sec%3600/60);
        const trimmedString = oneLineTrim`
            ${forceHours||hrs>=1?`${hrs}:`:''}
            ${hrs>=1?`0${min}`.slice(-2):minutes}:
            ${`0${Math.floor(sec%60)}`.slice(-2)}
        `;
    }
}