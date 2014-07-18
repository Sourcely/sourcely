'use strict';

var Promise  = require('bluebird'),
    clusters = require('../configMongo.js').connection,
    bcrypt   = require('bcrypt-nodejs'),
    jwt      = require('jwt-simple'),
    userModel= require('../mongoModels/userModel.js');

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

var findUserId = function(userId){
  return new Promise(function(resolve,reject){
    userModel.find({'_id': userId}, function(err, user){
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
  return new Promise(function(resolve,reject){
    var userId;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, null, function(err, result) {
        userModel.create({"username": username, passwordHash: result, readObjects: []}, function (err, data) {
          console.log('created user: ', data);
          var formattedData = {username: data['username'], userId: data['_id'] };
          var token = jwt.encode(formattedData, 'secretsauce');
          resolve({ token: token, readArticles: [], username: data['username']});
        });
      });
    });
  });
};

var updateUserReadArticles = function(clusterID, username) {
  findUser(username).then(function(data) {
    var readObjects = data.readObjects || [];
    if(readObjects.indexOf(clusterID) === -1){
      userModel.update({username: username},{$push: {readObjects: clusterID}}, function (err, data) {
        if (err) console.log(err);
        console.log(data);
      })
    };
  });
};

module.exports = {
  findUser: findUser,
  createUser: createUser,
  updateUserReadArticles: updateUserReadArticles,
  findUserId: findUserId
};
