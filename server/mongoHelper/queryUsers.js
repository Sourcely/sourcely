var Promise  = require('bluebird');
var clusters = require('../configMongo.js').connection;
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//must set strict to false
var userModel = mongoose.model('User', new Schema({username: String, passwordHash: String, readObjects: {}}, {strict: false}), 'clusterCollection');
var findUser = function(username){
  return new Promise(function(resolve,reject){
    userModel.find({'username': username}, function(err, user){
      if(err){
        console.log(err);
      }
      if(user.length === 0){
        resolve(false);
      }else{
        resolve(user);
      }
    })
  })
};

var createUser = function(username, password){
  userModel.create({"username": username, passwordHash: password, readObjects: {3: 3}});
};

var updateUserReadArticles = function(clusterID, username) {
  findUser(username).then(function(data) {
    var readObjects = data.readObjects || {};
    console.log('readObjects: ', readObjects);
    readObjects[clusterID] = clusterID;
    userModel.update( {username: username},
      { $set: {
          readObjects: readObjects
        }
      }
    )
  });
  findUser(username).then(function(data) {
    console.log('updated readObjects: ', data.readObjects);
  });
};

module.exports = {
  findUser: findUser,
  createUser: createUser,
  updateUserReadArticles: updateUserReadArticles
};
