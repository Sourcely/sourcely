var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clusterDatabase');
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
