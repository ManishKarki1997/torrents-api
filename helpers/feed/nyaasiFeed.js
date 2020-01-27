const scrapeNyaaSi = require('../nyaaSiScraper');

const nyaasiFeeds = async function () {
    const feeds = await scrapeNyaaSi('https://nyaa.si/?s=id&o=desc');
    return feeds;
};

nyaasiFeeds();

module.exports = nyaasiFeeds;