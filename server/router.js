module.exports = function(app){
    app.get('/', function(req, res, next){
        res.send("HELLO HOMEPAGE");
    });
    // Works and shows a message for /signup
    app.get('/signup', function(req, res, next){
        res.send("Thank you for signing up!");
    });
}