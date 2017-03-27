const Promise = require('bluebird');
const redis = require('promise-redis')((res) => { 
    return new Promise(res) 
});
const winston = require('winston');

const redisdb = redis.createClient({db: 3});
const handlerdb = redis.createClient();
const eventdb = redis.createClient();

module.exports = class Redis {
    get db() {
        return redisdb;
    }

    get handlerdb() {
        return handlerdb;
    }

    get eventdb() {
        return eventdb;
    }

    start() {
        redisdb.on('error', err => winston.error(err));
        redisdb.on('reconnecting', () => winston.warn('Redis reconnecting...'));
        handlerdb.on('psubscribe', (pattern, count) => {
            winston.info('redis handlerdb connected and subscribed.')
        });
        handlerdb.psubscribe('namae.bot.*');
        handlerdb.psubscribe('namae.web.*');
    }
}