const redis = require("redis");
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);


checkTorrentCache = (req, res, next) => {
    const { url, torrentSource } = req.query;

    redis_client.get(url.toLowerCase(), (err, data) => {

        if (err) {
            res.status(500).send(err);
        }
        if (data) {
            // If data exists on the redis cache, send it instead
            res.send({
                error: false,
                cached: true,
                payload: {
                    torrents: data,
                    actualTorrent: true,
                    torrentSource
                }
            });
        } else {
            //if it doesn't exist, proceed forward
            next();
        }
    });
};

module.exports = checkTorrentCache;