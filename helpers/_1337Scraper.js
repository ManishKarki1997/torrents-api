const cheerio = require('cheerio');
const axios = require('axios');
const getHTML = require('./getHTML');
let torrents = [];

async function asyncMagnetScrapePromise(item) {
    return getMagnet(item);
}



async function promisesArray(torrents) {
    // This works, but i need the torrent names, seeds and other informations too
    return Promise.all(torrents.map(t => asyncMagnetScrapePromise(t.torrentURL)));

    // TODO Make it return torrent Information along with its magnet
    // This doesn't work
    // return Promise.all(torrents.map(t => {
    //     return {
    //         torrentName: t.torrentName,
    //         torrentSeeds: t.torrentSeeds,
    //         torrentLeeches: t.torrentLeeches,
    //         torrentMagnet: asyncMagnetScrapePromise(t.torrentURL)
    //     }
    // }))
}

async function getMagnet(url) {
    const html = await getHTML('htts://1337x.to' + url);
    const $ = cheerio.load(html);
    const magnet = $('.clearfix ul li a').attr('href') || "Not Found";
    return magnet;
}

async function scrape1337x(_1337xURL) {

    const html = await getHTML(_1337xURL);

    const $ = cheerio.load(html);
    const torrentsContainer = $('.table-list tbody').html();

    let scrapedResults = []

    $(torrentsContainer).each(function (i, el) {

        const torrentName = $(this).children('td').children('a').eq(1).text();

        let torrentURL = $(this).find('td.name').find('a').eq(1).attr('href');

        const torrentSeeds = $(this).find('td.seeds').text();
        const torrentLeeches = $(this).find('td.leeches').text();


        scrapedResults.push({
            torrentName,
            torrentURL,
            torrentSeeds,
            torrentLeeches
        })
    })

    // got weird result to 'undefined' torrentURL so filtering out the undefined ones
    torrents = scrapedResults.filter(torr => torr.torrentURL !== undefined);

    return torrents;

}

exports.scrape1337x = scrape1337x;
exports.promisesArray = promisesArray;