var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define User Schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback){
  var user = this;

  // Break out if the password hasn't changed
  if(!user.isModified('password'))
    return callback();

  // Password changed, so we hash the password and store it in the model and mongoDB
  bcrypt.genSalt(5, function(err, salt){
    if (err)
      return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err)
        return callback(err);

      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if (err)
      return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
