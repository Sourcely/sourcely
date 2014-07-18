##Sourcely - Top Sources for Your Tech Stories

See it: [Sourcely](http://www.sourcely.io)

__Sourcely__ was conceived as a better way to provide RSS news aggregation. When subscribed to RSS feeds, we regularly ran into multiple articles covering the same story. __Sourcely__ aggregates similar news articles into story clusters - allowing you to choose which article(s) you want to read from.

__Sourcely__ is written in Javascript, CSS (utilizing [SASS](http://sass-lang.com/)) and HTML and uses [AngularJS](http://angularjs.org/) on the client side. The API server is an [Express](http://expressjs.com/) (NodeJS) server and the data is served by a MongoDB instance on [MongoLab](http://MongoLab.com). The web scraping and clustering of RSS feeds is performed by a Python [Flask](http://flask.pocoo.org/) server, utilizing a [tf-idf](http://en.wikipedia.org/wiki/Tf%E2%80%93idf) algorithm for clustering.
