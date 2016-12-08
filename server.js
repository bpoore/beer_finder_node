var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');

var db = require('./dbqueries.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Renders landing page for app
app.get('/', function(req, res) {
  res.render('landing.hbs');
});

app.get('/taphouses', function(req, res) {
  res.render('taphouses.hbs');
});

app.get('/add_taphouse', function(req, res) {
	console.log(req.query.name);
	db.insertTaphouse(req.query.name, req.query.street_address, req.query.city, req.query.state, req.query.zip).then(function(results) {
		res.render('landing.hbs');
	});
});

app.use(function(req, res, next){
  res.type('text/plain');
  res.status(404);
  res.send('404 - There is nothing here save for vast expanses of nothing');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit');
});