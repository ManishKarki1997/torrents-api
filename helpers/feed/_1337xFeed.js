const cheerio = require('cheerio');
const getHTML = require('../../helpers/getHTML');
const { promisesArray, scrape1337x, get1337Magnet } = require('../../helpers/_1337Scraper');


const scrape1337xTorrents = async function (url) {
    const scrapedTorrents = await scrape1337x(url);
    let torrents = scrapedTorrents.filter(torr => torr.torrentName !== '');
    return torrents;
};



const _1337Feed = async () => {
    // https://1337x.to/popular-movies
    // popular-games
    // popular-anime
    // popular-apps

    try {
        let [popularMovies, popularGames, popularApps, popularTVShows] = await Promise.all([scrape1337xTorrents('https://1337x.to/popular-movies'), scrape1337xTorrents('https://1337x.to/popular-games'),
        scrape1337xTorrents('https://1337x.to/popular-anime'), scrape1337xTorrents('https://1337x.to/popular-apps')]);

        return {
            popularMovies,
            popularGames,
            popularApps,
            popularTVShows
        }

    } catch (error) {
        console.log(error)
        return;
    }

}

_1337Feed();

module.exports = _1337Feed;