const cheerio = require('cheerio');
const getHTML = require('./getHTML');

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

async function get1337Magnet(url) {
    let torrent = {};
    const html = await getHTML(url);
    const $ = cheerio.load(html);
    const magnet = $('.clearfix ul li a').attr('href') || "";
    const torrentSize = $('ul.list').eq(1).find('li').eq('3').find('span').text();
    const torrentDownloads = $('ul.list').eq(2).find('li').eq(0).find('span').text();
    torrent.magnet = magnet;
    torrent.torrentSize = torrentSize;
    torrent.torrentDownloads = torrentDownloads;

    return torrent;
}

async function scrape1337x(_1337xURL) {

    let torrents = [];
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
            torrentURL: 'https://1337x.to' + torrentURL,
            torrentSeeds,
            torrentLeeches,
            actualTorrent: false
        })
    })

    // got weird result to 'undefined' torrentURL or empty torrent names so filtering them out
    torrents = scrapedResults.filter(torr => torr.torrentName !== '');

    return torrents;

}

exports.scrape1337x = scrape1337x;
exports.promisesArray = promisesArray;
exports.get1337Magnet = get1337Magnet;