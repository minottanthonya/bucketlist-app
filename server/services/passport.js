var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var LocalStrategy = require('passport-local');
// create local strategy.
// usernameField: 'email'
var localOptions = { usernameField:'email'}
var localLogin = new LocalStrategy(localOptions, function(email. password, done){

  User.findOne({email: email}, function(err, user){
    if(err) { return done(err); }
    if(!user) {return done{null, false}; } 
  });

});

var jwtOptions = {};

// create jwt strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    }else {
      done(null, false);
    }

  });

});

var jwtOptions ={
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

passport.use(jwtLogin);
passport.use(localLogin);