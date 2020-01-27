const express = require('express');
const Router = express.Router();
const checkCache = require('../helpers/checkRedisCache');
const checkTorrentCache = require('../helpers/checkTorrentCache')

Router.get("/", async (req, res) => {

})


module.exports = Router;