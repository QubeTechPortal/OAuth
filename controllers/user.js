var User = require('../models/user');

// Endpoint /api/users for POST
exports.postUsers = function(req, res){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err){
    if (err)
        res.send(err);

    res.json({ message: 'New user added'});
  });
};

// Endpoint /api/users for GET (This is just for developmental purpose for testing the woring of the application)
exports.getUsers = function(req, res){
  User.find(function(err, res){
    if (err)
      res.send(err);

    res.json(users);
  });
};
