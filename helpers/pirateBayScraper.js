const cheerio = require('cheerio');
const getHTML = require('./getHTML');
let torrents = [];

// https://www.pirate-bay.net/search?q=Lord+of+the+rings?q=Lord+of+the+rings

async function scrapePirateBay(url) {
    const html = await getHTML(url);

    const $ = cheerio.load(html);


    const torrentsContainer = $('#searchResult').html();
    console.log(torrentsContainer)

    $(torrentsContainer).each((i, el) => {

        const torrentName = $('.detLink').text();

        // const torrentName = $('.detLink').attr('title');
        console.log(torrentName);

    });

}

scrapePirateBay('https://www.pirate-bay.net/search?q=Lord+of+the+rings?q=Lord+of+the+rings');