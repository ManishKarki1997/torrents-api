const cheerio = require('cheerio');
const getHTML = require('./getHTML');


async function scrapeNyaaSi(url) {
    let torrents = [];
    let filteredTorrents = [];
    const html = await getHTML(url);

    const $ = cheerio.load(html);

    const torrentsList = $('tbody').html();

    // console.log(torrentsList);
    $(torrentsList).each((i, el) => {
        const td = $(el).children('td');
        const torrentName = $(el).find('td[colspan="2"]').find('a').eq(1).text();

        const torrentDownloadLink = $(td).eq(2).find('a').attr('href');
        const torrentMagnetLink = $(td).eq(2).find('a').eq(1).attr('href');

        const torrentSize = $(td).eq(3).text();
        const torrentSeeds = $(td).eq(5).text();
        const torrentLeeches = $(td).eq(6).text();

        const torrent = {
            torrentName,
            torrentDownloadLink: 'https://nyaa.si' + torrentDownloadLink,
            torrentMagnetLink,
            torrentSize,
            torrentSeeds,
            torrentLeeches,
            actualTorrent: true
        };
        torrents.push(torrent);
    })

    filteredTorrents = torrents.filter(t => t.torrentName !== '');

    return filteredTorrents;


};

module.exports = scrapeNyaaSi;