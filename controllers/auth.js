var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(username, password, callback){
    User.findOne({ username: username}, function(err, user){
      if (err)
        return callback(err);

      // Invalid user
      if (!user)
        return callback(null, false);

      user.verifyPassword(password, function(err, isMatch){
        if (err)
          return callback(err);

        // Password didn't match
        if (!isMatch)
          return callback(null, false);

        // Success
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});
