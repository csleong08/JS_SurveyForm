var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'liverpool',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

// --------Routes and Locations Below----------
app.get('/', function(request, response) 
{
    var Dojo = ["Seattle", "San Jose", "San Francisco"];
    var FavLang = ["English", "Spanish", "American"];
    response.render('index', {dojo:Dojo, favLang:FavLang});
});
app.post('/create', function (request, response)
{
    request.session.name = request.body.Name;
    request.session.dojo = request.body.Dojo;
    request.session.favLang = request.body.FavLang;
    request.session.comment = request.body.Comment;
    // request.session.save();
    response.redirect('/result');
});
app.get('/result', function(request, response) 
{
    var context = 
    {
        Name: request.session.name,
        Dojo: request.session.dojo,
        FavLang: request.session.favLang,
        Comment: request.session.comment,
    }
    response.render('result', context);
});
app.post('/reset', function (request, response)
{
    request.session.destroy();
    response.redirect('/');
});
// -----Port Listener------------
app.listen(8000, function() {
  console.log("listening on port 8000");
})
