var oauth2orize = require('oauth2orize');
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');

// Create OAuth2 Server
var server = oauth2orize.createServer();

// Register serialization function
server.serializeClient(function(client, callback){
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback){
  Client.findOne({ _id: id}, function(err, client){
    if(err)
      return callback(err);

    return callback(null, client);
  });
});
