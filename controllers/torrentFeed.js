const express = require('express');
const Router = express.Router();
const redis = require('redis');
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);


const checkFeedCache = require('../middlewares/checkFeedCache');

// Torrent Providers Feeds
const _1337FeedsProvider = require('../helpers/feed/_1337xFeed');
const ytsFeedsProvider = require('../helpers/feed/ytsFeed');
const nyaasiFeedsProvider = require('../helpers/feed/nyaasiFeed');

Router.get("/", checkFeedCache, async (req, res) => {

    try {

        const _1337xFeeds = await _1337FeedsProvider();
        const ytsFeeds = await ytsFeedsProvider();
        const nyaasiFeeds = await nyaasiFeedsProvider();

        const feeds = {
            _1337xFeeds, ytsFeeds, nyaasiFeeds, lastRefreshed: Date.now()
        }

        // Cache the feeds for all providers for, say, 24 hrs
        redis_client.setex('torrent-feeds', 86400, JSON.stringify(feeds));


        return res.send({
            error: false,
            cached: false,
            payload: feeds
        });

    } catch (error) {
        console.log(error)
        return res.send({
            error: true,
            message: "Something went wrong while retrieving torrent feeds. Please try again later or contact me."
        })
    }
})


module.exports = Router;