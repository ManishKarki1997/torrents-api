const redis = require("redis");
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);


checkCache = (req, res, next) => {
    const { searchTerm } = req.query;

    redis_client.get(searchTerm.toLowerCase(), (err, data) => {

        if (err) {
            res.status(500).send(err);
        }
        if (data) {
            // If data exists on the redis cache, send it instead
            res.send({
                error: false,
                cached: true,
                data
            });
        } else {
            //if it doesn't exist, proceed forward
            next();
        }
    });
};

module.exports = checkCache;