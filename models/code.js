var mongoose = require('mongoose');

// Define access token
var CodeSchema = new mongoose.Schema({
  value: {type: String, required: true},
  redirectUri: {type: String, required: true},
  userId: {type: String, required: true},
  clienId: {type: String, required: true}
});

module.exports = mongoose.model('Code', CodeSchema);
