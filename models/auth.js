var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require(./models.user);

passport.use(new BasicStrategy(
  function(username, password, callback){
    
  }
))
