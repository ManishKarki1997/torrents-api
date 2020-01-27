const express = require('express');
const Router = express.Router();
const checkCache = require('../middlewares/checkRedisCache');
const checkTorrentCache = require('../middlewares/checkTorrentCache')

// Torrent Providers Feeds
const _1337FeedsProvider = require('../helpers/feed/_1337xFeed');
const ytsFeedsProvider = require('../helpers/feed/ytsFeed');

Router.get("/", async (req, res) => {

    try {

        const _1337xFeeds = await _1337FeedsProvider();
        const ytsFeeds = await ytsFeedsProvider();

        // Cache the feeds for all providers for, say, 24 hrs
        redis_client.setex('torrent-feed', 86400, JSON.stringify(allTorrents));


        return res.send({
            error: false,
            cached: false,
            payload: { _1337xFeeds, ytsFeeds, lastRefreshed: Date.now() }
        });

    } catch (error) {
        return res.send({
            error: true,
            message: "Something went wrong while retrieving torrent feeds. Please try again later or contact me."
        })
    }
})


module.exports = Router;