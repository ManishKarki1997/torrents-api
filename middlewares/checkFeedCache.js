const redis = require("redis");
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);


checkCache = (req, res, next) => {

    redis_client.get('torrent-feeds', (err, data) => {

        if (err) {
            res.status(500).send(err);
        }
        if (data) {
            const torrents = JSON.parse(data);
            // If data exists on the redis cache, send it instead
            res.send({
                error: false,
                cached: true,
                payload: torrents
            });
        } else {
            //if it doesn't exist, proceed forward
            next();
        }
    });
};

module.exports = checkCache;