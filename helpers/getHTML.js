const axios = require('axios');


async function getHTML(url) {
    const res = await axios.get(url);
    return res.data;
};

module.exports = getHTML;