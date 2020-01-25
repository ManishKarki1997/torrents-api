const express = require('express');
const Router = express.Router();
const checkCache = require('./helpers/checkRedisCache');
const getHTML = require("./helpers/getHTML");
const cheerio = require("cheerio");
const redis = require('redis');
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

// Site Scrapers
const { promisesArray, scrape1337x } = require('./helpers/_1337Scraper');



Router.get('/', async (req, res) => {


    try {

        let allTorrents = []
        let { searchTerm, category } = req.query;

        _1337xURL = category === undefined ? `https://1337x.to/search/${searchTerm}/1/` : `https://1337x.to/category-search/${searchTerm}/${category}/1/`;

        const _1337Torrents = await scrape1337x(_1337xURL);

        // TODO this only returns all magnets right now. Make it so that it returns torrent details along with the magnet

        // const results = await promisesArray(_1337Torrents);


        allTorrents.push({
            site: '1337x.to',
            torrents: _1337Torrents
        });


        // //add data to Redis. Cache it for 2 hours | 7200s
        redis_client.setex(searchTerm.toLowerCase(), 7200, JSON.stringify(allTorrents));

        return res.send({
            error: false,
            payload: allTorrents
        })

    } catch (error) {
        return res.send({
            error: true
        })
    }
});


module.exports = Router;