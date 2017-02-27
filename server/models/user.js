var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        password: String
});

  userSchema.pre('save', function(next){
  var user = this;

    bcrypt.genSalt(10, function(err, salt){
      if(err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash){
          if (err) { return next(err); }

          user.password = hash;
          next();
        });
    });
  });

var model = mongoose.model('user', userSchema);

userSchema.methods.comparePassword = function(candidatePassword, callback){
  // this.password is our hashed and salted password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    // if there was an error, return the callbackwith the error
    if (err) { return callback(err); }
    // otherwise call the callback
    callback(null, isMatch);
  });
}

var localLogin = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({email: email}), function(err, user){
    // if there's an error in the search, return early with error object
    if(err) { return done(err)};
    // not and error, just user not found
    if(!user) {return done(null, false); }

    // compare passwords - is 'password' equal to user.password?
    // compare pw from req with users saved pw
    user.comparePassword(password, function(err, isMatch){
      // is there was an error, return early/
      if(err) { return done(err); }
      // if it's not the smae, it will return false and say they didn't match up.
      if(!isMatch) { return done(null, false); }

      // ifsame, it will call passport callback with user model
      return done(null, user);
    });
    // tricky part -> we salted the password, and we need to somehow decode encrypted pw to normal pw.
  }
  // Otherwise, call done with false
});

module.exports= model;