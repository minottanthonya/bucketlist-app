var Auth = require('./controllers/auth');
var User = require('./models/user');

module.exports = function(app){
    app.get('/', function(req, res, next){
        res.send("HELLO HOMEPAGE");
    });
    // Works and shows a message for /signup
    // app.get('/signup', function(req, res, next){
    //     res.send("Thank you for signing up!");
    // });
}

module.exports = function(app){
  app.post('/signup', Auth.signup);
}