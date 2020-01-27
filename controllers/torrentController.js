const express = require('express');
const Router = express.Router();
const checkCache = require('../middlewares/checkRedisCache');
const checkTorrentCache = require('../middlewares/checkTorrentCache')

const redis = require('redis');
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

// Site Scrapers
const { promisesArray, scrape1337x, get1337Magnet } = require('../helpers/_1337Scraper');
const nyaaSiScraper = require('../helpers/nyaaSiScraper');
const { scrapeYTS, scrapeYTSLink } = require('../helpers/ytsScraper');



Router.get('/', checkCache, async (req, res) => {


    try {
        let allTorrents = []
        let { searchTerm, category } = req.query;

        let _1337xURL = category === undefined ? `https://1337x.to/search/${searchTerm}/1/` : `https://1337x.to/category-search/${searchTerm}/${category}/1/`;
        // let pirateBayURL = `https://www.pirate-bay.net/search?q=${searchTerm}`;
        let nyaaSiURL = `https://nyaa.si/?f=0&c=0_0&q=${searchTerm}&s=seeders&o=desc`;
        let ytsURL = `https://yts.ms/browse-movies/${searchTerm}/all/all/0/seeds`;

        const [_1337Torrents, nyaaSiTorrents, ytsTorrents] = await Promise.all([scrape1337x(_1337xURL), nyaaSiScraper(nyaaSiURL), scrapeYTS(ytsURL)]);


        // const _1337Torrents = await scrape1337x(_1337xURL);
        // const nyaaSiTorrents = await nyaaSiScraper(nyaaSiURL);
        // const ytsTorrents = await scrapeYTS(ytsURL);

        // TODO this only returns all magnets right now. Make it so that it returns torrent details along with the magnet
        // const results = await promisesArray(_1337Torrents);


        allTorrents.push({
            site: '1337x.to',
            name: '1337x',
            torrents: _1337Torrents
        }, {
            site: 'nyaa.si',
            name: 'Nyaa.si',
            torrents: nyaaSiTorrents
        }, {
            site: 'yts.ms',
            name: 'YTS',
            torrents: ytsTorrents
        });


        // //add data to Redis. Cache it for 2 hours | 7200s
        redis_client.setex(searchTerm.toLowerCase(), 7200, JSON.stringify(allTorrents));

        return res.send({
            error: false,
            cached: false,
            payload: allTorrents
        })

    } catch (error) {
        console.log(error);
        return res.send({
            error: true,
            message: "Please try again later",
            payload: []
        })
    }
});

Router.get('/torrent', checkTorrentCache, async (req, res) => {
    let torrents = [];
    try {
        const { url, torrentSource } = req.query;

        torrents = torrentSource === 'YTS' ? await scrapeYTSLink(url) : await get1337Magnet(url);


        redis_client.setex(url.toLowerCase(), 3600, JSON.stringify(torrents));


        return res.send({
            error: false,
            cached: false,
            payload: {
                torrents,
                actualTorrent: true,
                torrentSource
            }

        })

    } catch (error) {
        console.log(error)
        return res.send({
            error: true,
            message: "Something went wrong. Please try again later",
            payload: []
        })
    }
})


module.exports = Router;