var Client = require('../models/client');

// Endpoint /api/client for POST
exports.postClients = function(req, res){
  // Create new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the post data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  // Save the Client credentials in the DB
  client.save(function(err){
    if (err)
      res.send(err);

    res.json({message: 'Client application has been successfully registered!'});
  });
};

// Endpoint /api/clients for GET
exports.getClients = function(req, res){
  // Find all the Client Applications
  Client.find({userId: req.user_id}, function(err, clients){
    if (err)
      res.send(err);

      res.json(clients);
  });
};
