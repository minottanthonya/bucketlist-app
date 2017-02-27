var Auth = require('./controllers/auth');
var passportService = require('./services/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
   
    app.get('/', requireAuth, function(req, res){
        res.send("HELLO HOMEPAGE");
    });
    // Works and shows a message for /signup
    // app.get('/signup', function(req, res, next){
    //     res.send("Thank you for signing up!");
    // });
    app.post('/signup', Auth.signup);
    app.post('/signin', requireSignin, Auth.signin);
}

module.exports = function(app){
  app.post('/signup', Auth.signup);
}