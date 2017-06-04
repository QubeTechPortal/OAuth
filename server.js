var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');

mongoose.connect('mongodb://localhost:271017/OAuth');
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport module in our application
app.use(passport.initialize());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req,res){
  res.json({ message: 'Qube Technologies'});
});

router.route('users')
  .post(userController.postUsers)
  .get(userController.getUsers);

routers.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);
  
app.use('/api', router);

app.listen(port);
console.log("Server running at port " + port);
