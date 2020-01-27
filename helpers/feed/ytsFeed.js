const cheerio = require('cheerio');
const getHTML = require('../../helpers/getHTML');

const ytsFeedScraper = async function () {
    // https://yts.ms/
    const html = await getHTML('https://yts.ms/');

    const $ = cheerio.load(html);

    let popularDownloads = [];
    let latestMoviesTorrents = [];


    $('.hero__cards .card-container>.card').each((i, el) => {

        let movieName = $(el).find('.image-container-link').attr('title');
        let torrentURL = 'https://yts.ms' + $(el).find('.image-container-link').attr('href');
        let moviePoster = $(el).find('.hero__card-img').attr('src');
        let releaseYear = $(el).find('span').text();

        popularDownloads.push({ movieName, torrentURL, moviePoster, releaseYear, actualTorrent: false });
    });

    $('.movies__main .card-container>.card').each((i, el) => {
        let movieName = $(el).find('.image-container-link').attr('title');
        let torrentURL = 'https://yts.ms' + $(el).find('.image-container-link').attr('href');
        let moviePoster = $(el).find('.hero__card-img').attr('src');
        let releaseYear = $(el).find('span').text();

        latestMoviesTorrents.push({ movieName, torrentURL, moviePoster, releaseYear, actualTorrent: false });

    });

    return {
        popularDownloads,
        latestMoviesTorrents
    }

}

module.exports = ytsFeedScraper;
