var express = require('express');
var mongoose = require('mongoose');
var body-parser = require('body-parser');


var app = express();
mongoose.connect('mongodb://localhost:271017/OAuth');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true;
}));

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req,res){
  res.json({ message: 'Qube Technologies'});
});

app.use('/api', router);

app.listen(port);
console.log("Server running at port " + port);
