var mongoose = require('mongoose');
//mongoose.connect('mongodb://sourcely:sourcely@oceanic.mongohq.com:10033/app25019458');
mongoose.connect('localhost:27017');
var Admin = mongoose.mongo.Admin;
var clusterConnection = mongoose.connection;

clusterConnection.on('open', function() {
    clusterConnection.db.collectionNames(function(error, names) {
    if (error) {
      throw new Error(error);
    } else {
      names.map(function(cname) {
        // console.log(cname.name);
      });
    }
  });
});

module.exports = {connection: clusterConnection}
