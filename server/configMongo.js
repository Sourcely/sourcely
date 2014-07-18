'use strict';

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

var Admin = mongoose.mongo.Admin,
    clusterConnection = mongoose.connection;

clusterConnection.on('open', function() {
    clusterConnection.db.collectionNames(function(error, names) {
    if (error) {
      throw new Error(error);
    } else {
      names.map(function(cname) {
      });
    }
  });
});

module.exports = {connection: clusterConnection}
