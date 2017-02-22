var User =  require('../models/user');

exports.signup = function(req, res, next){

  var email = req.body.email;
  var password = req.body.password;

  if( !email || !password){
    return res.status(418).send({error: 'You must provide email and pw.'});
  }

  User.findOne({ email:email }, function(err, existingUser){
    if(err) {
      return next(err);
    } //handle search error

    if(existingUser){
      // return res.status(418).send(err);
      return res.status(418).send("Email is in use");
    } //handles existing users

    var user = new User({
      email: email,
      password: password
    });
    //to save the record to the DB
    user.save(function(err){
      if(err) { return next(err); }

      //Respond to request indicating the user was created
      res.json({success: true});
    });
  });
}