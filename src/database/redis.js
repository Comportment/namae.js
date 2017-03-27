const Promise = require('bluebird');
const redis = require('promise-redis')((res) => { 
    return new Promise(res) 
});
const redisdb = redis.createClient({ db: 3 });

module.exports = class Redis {
    get db() {
        return redisdb;
    }

    start() {
        redisdb.on('error', err => winston.error(err));
        redisdb.on('reconnecting', () => winston.warn('Redis reconnecting...'));
        redisdb.subscribe('namae.bot');
    }
}