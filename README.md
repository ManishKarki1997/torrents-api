# Torrents API

> API for scraping torrents from YTS, 1337x and Nyaa.si with Caching

The app for this api is at https://github.com/ManishKarki1997/torrents
![](https://media.giphy.com/media/mCnTJNsJWyLZXd0vOv/giphy.gif)

# How to install

``` bash

# Clone the repo
$ git clone https://github.com/ManishKarki1997/torrents.git

# Install dependencies
$ npm install

# Download redis for windows/mac or linux and leave it running
$ redis-server

# Start the server
$ npm run start

```

## The responses are cached in for 2 hours. The feeds are cached for 24 hours.

# How it works

> There are four api endpoints:

1. /api/search  [takes 'searchTerm' as query ]
```
$ /api/search?searchTerm=parasyte

```
2. /api/search/torrent [takes url and torrentSource as query]

> the /api/search route gives direct torrent and magnet link from nyaa.si but yts and 1337x just gives the torrent info.

> You need to further call this endpoint to get the actual torrent/magnet link

> The torrentSource is either 'YTS' or '1337x'

> The url is the torrentURL you receive from the /api/search endpoint

```

$ /api/search/torrent?url='url_of_the_torrent_file'&torrentSource='YTS'

```

3. /api/feed 

> doesn't need any arguments

> scrapes the homepage of yts, 1337x and nyaa.si and responds with the torrent information

> currently, the response is cached into redis for 24 hrs.
