var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var ejs = require('ejs');
var session = require('express-session');
var oath2Controller = require('./controllers/oauth2');

mongoose.connect('mongodb://localhost:27017/OAuth');
var app = express();

//
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2 requires it
// express-session is used to authenticate requests
app.use(session({
  secret: 'Super Secret Session key',
  saveUnintialized: true,
  resave: true
}));

// Use the passport module in our application
app.use(passport.initialize());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req,res){
  res.json({ message: 'Qube Technologies'});
});

//endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isAuthenticated, oauth2Controller.token);

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

app.use('/api', router);

app.listen(port);
console.log("Server running at port " + port);
