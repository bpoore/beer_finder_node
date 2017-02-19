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
  context = {};
  db.getTaphouses().then(function(taphouses) {
    db.getBeers().then(function(beers) {
      context.beers = beers;
      context.taphouses = taphouses;
      res.render('home.hbs', context);
    });
  });
});

app.get('/taphouses', function(req, res) {
  context = {};

  if (req.query.name != undefined) {
    db.insertTaphouse(req.query.name, req.query.street_address, req.query.city, req.query.state, req.query.zip);
  }

  db.getTaphouses().then(function(results) {
    context.taphouses = results;
    res.render('taphouses.hbs', context);
  });
});

app.get('/breweries', function(req, res) {
  context = {};

  if (req.query.name != undefined) {
    db.insertBrewery(req.query.name, req.query.city, req.query.state);
  }

  db.getBreweries().then(function(results) {
    console.log("HERE");
    context.breweries = results;
    res.render('breweries.hbs', context);
  });
});

app.get('/beers', function(req, res) {
  context = {}

  if (req.query.name != undefined) {
    db.insertBeer(req.query.name, req.query.type, req.query.alc_bv, req.query.brewery);
  }

  db.getBreweries().then(function(breweries) {
    db.getBeers().then(function(beers) {
      context.beers = beers;
      context.breweries = breweries;
      res.render('beers.hbs', context);
    });
  });
});

app.get('/on_tap', function(req, res) {
  context = {};

  if (req.query.beer_id != undefined) {
    db.addBeerToTaphouse(req.query.taphouse_id, req.query.beer_id, req.query.pint, req.query.growler);
  }

  db.getTaphouse(req.query.taphouse_id).then(function(taphouse) {
    db.getBeersByTaphouse(req.query.taphouse_id).then(function(beers_by_taphouse) {
      db.getBeers().then(function(beers) {
        context.beers = beers;
        context.beers_by_taphouse = beers_by_taphouse;
        context.taphouse = taphouse[0];
        res.render('now_on_tap.hbs', context);
      });
    });
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