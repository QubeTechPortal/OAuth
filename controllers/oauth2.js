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

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback){
  // Create new authorization code
  var code = new Code({
    value: uid(16),
    clientId: client._id,
    redirectUri: redirectUri,
    userId: user._id
  });

  // Save the auth code and check for errors
  code.save(function(err){
    if(err)
      return callback(err);

    callback(null, code.value);
  });
}));

// Exchange authorization codes for access token
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback){
  Code.findOne({value: code}, function(err, authCode){
    if (err)
      return callback(err);

    if (authCode == undefined)
      return callback(null, false);

    if (client._id.toString() !== authCode.clientId)
      return callback(null, false);

    if(redirectUri !== authCode.redirectUri)
      return callback(null, false);

    // Delete auth code that it has been used
    authCode.remove(function(err){
      if(err)
        return callback(url);

      var token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId
      });

      token.save(function(err){
        if(err)
          return callback(err);
        callback(null, token);
      });
    });
  });
}));
