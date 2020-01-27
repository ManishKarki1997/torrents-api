const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');


const torrentsController = require('./controllers/torrentController');
const torrentFeed = require('./controllers/torrentFeed');

// Check Redis Cache Middleware
const { checkCache } = require('./helpers/checkRedisCache');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/search', torrentsController);
app.use('/api/feed', torrentFeed);


const PORT = process.env.PORT || 3000;


// const searchTerm = process.argv.slice(2)[0];
// const genre = process.argv.slice(3)[0];
// let searchTerm = '';
// let genre = '';






// const torrentSearchURLs=[]




app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server running on port ${PORT}`)
})



// async function scrape() {
//     const html = await getHTML();

//     const $ = cheerio.load(html);
//     const torrentsContainer = $('.table-list tbody').html();

//     let scrapedResults = []

//     $(torrentsContainer).each(function (i, el) {

//         const torrentName = $(this).children('td').children('a').eq(1).text();

//         let torrentURL = $(this).find('td.name').find('a').eq(1).attr('href');

//         const torrentSeeds = $(this).find('td.seeds').text();
//         const torrentLeeches = $(this).find('td.leeches').text();

//         scrapedResults.push({
//             torrentName,
//             torrentURL,
//             torrentSeeds,
//             torrentLeeches
//         })
//     })
//     torrents = scrapedResults.filter(torr => torr.torrentURL !== undefined);
//     console.log(torrents)

// }
// scrape();
