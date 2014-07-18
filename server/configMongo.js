'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://sourcely:sourcely@oceanic.mongohq.com:10033/app25019458');

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
