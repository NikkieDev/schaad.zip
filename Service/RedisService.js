const Redis = require('ioredis');

class RedisService
{
    constructor()
    {
        if (RedisService.instance) {
            return RedisService.instance;
        }

        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            idleTimeoutMillis: 0,
            reconnectOnErr: (err) => {
                console.log("Redis had an error, " + err + '. Reconnecting.');
                return true;    
            }
        });

        this.redis.on('connect', () => {
            console.log("Redis server connected.");
        })

        this.redis.on('disconnect', () => {
            console.log("Redis server disconnected.");
        });
    }
}