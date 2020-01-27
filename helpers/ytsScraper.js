// https://yts.ms/browse-movies/harry%20potter/all/all/0/seeds

const cheerio = require('cheerio');
const getHTML = require('./getHTML');

async function scrapeYTS(url) {
    let torrents = [];
    const html = await getHTML(url);

    const $ = cheerio.load(html);

    const torrentsContainer = $('.__main').html();

    $(torrentsContainer).find(".card-container > .card").each((i, el) => {
        const torrentName = $(el).find('.image-container-link').attr('title');
        const torrentURL = 'https://yts.ms' + $(el).find('.image-container-link').attr('href');
        const torrent = {
            torrentName,
            torrentURL,
            actualTorrent: false
        };
        torrents.push(torrent);
    });

    return torrents;
};


// single movie link : https://yts.ms/movie/harry-potter-and-the-deathly-hallows-part-1-2010
async function scrapeYTSLink(url) {
    let links = [];
    let html = await getHTML(url);

    const $ = cheerio.load(html);

    $('.download-torrent').each((i, el) => {
        const torrentName = $(el).attr('title');
        const torrentLink = $(el).attr('href');
        const torrent = {
            torrentName,
            torrentLink,
            actualTorrent: true
        };
        links.push(torrent);
    });
    return links;
}



exports.scrapeYTS = scrapeYTS;
exports.scrapeYTSLink = scrapeYTSLink;