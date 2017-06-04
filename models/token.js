var mongoose = require('mongoose');

// Define Token Schema
var TokenSchema = new mongoose.Schema({
  // Value field is the actual token value
  value: {type: String, required: true},
  userId: {type: String, required: true},
  clienId: {type: String, required: true},
});

module.exports = mongoose.model('Token', TokenSchema);
