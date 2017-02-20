var mysql = require('mysql');
var SQL = require('sql-template-strings');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-iron-east-04.cleardb.net',
  user            : 'bbef480f7baaba',
  password        : '9966f809e9432ad',
  database        : 'heroku_643b9f3b4adb7e5'
});


exports.insertTaphouse = function(name, street_address, city, state, zip) { 
	if (street_address.length === 0) {
		street_address = undefined;
	};

	if (city.length === 0) {
		city = undefined;
	};

	if (state.length === 0) {
		state = undefined;
	};

	if (zip.length === 0) {
		zip = undefined;
	}

  return new Promise(function(resolve, reject) {
	 pool.query(SQL`INSERT INTO taphouse (name, street_address, city, state, zip) VALUES (${name}, ${street_address}, ${city}, ${state}, ${zip})`, function(err, results, fields) {
  	 if (err) {
  		  console.log(err);
    	 console.log("Error inserting into taphouse table.");
      	return;
  	 }
      resolve(results);
    });
  });
};

exports.getTaphouses = function() { 
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM taphouse`, function(err, results, fields) {
        if (err) {
          console.log(err);
          console.log("Error getting taphouses.");
          return;
        }
          resolve(results);
      });
  });
};

exports.getTaphouse = function(id) { 
    return new Promise(function(resolve, reject) {
      pool.query(SQL`SELECT id, name FROM taphouse WHERE id=${id}`, function(err, results, fields) {
        if (err) {
          console.log(err);
          console.log("Error getting taphouse.");
          return;
        }
          resolve(results);
      });
  });
};

exports.insertBrewery = function(name, city, state) { 
  if (city.length === 0) {
    city = undefined;
  };

  if (state.length === 0) {
    state = undefined;
  };

  return new Promise(function(resolve, reject) {
    pool.query(SQL`INSERT INTO brewery (name, city, state) VALUES (${name}, ${city}, ${state})`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error inserting into brewery table.");
        return;
      }
      resolve(results);
    });
  });
};

exports.getBreweries = function() { 
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM brewery`, function(err, results, fields) {
        if (err) {
          console.log(err);
          console.log("Error getting breweries.");
          return;
        }
        resolve(results);
      });
  });
};

exports.insertBeer = function(name, type, alc_bv, brewery) {
  return new Promise(function(resolve, reject) {
    pool.query(SQL`INSERT INTO beer (name, type, alc_bv, brewery) VALUES (${name}, ${type}, ${alc_bv}, ${brewery})`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error inserting into beer table.");
        return;
      }
      resolve(results);
    });
  });
};

exports.getBeers = function() { 
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT beer.id, beer.name, type, alc_bv, brewery.name AS breweryName FROM beer INNER JOIN brewery ON beer.brewery=brewery.id`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error getting beers.");
        return;
      }
      resolve(results);
    });
  });
};

exports.getBeersByTaphouse = function(taphouse) {
  return new Promise(function(resolve, reject) {
    pool.query(SQL`SELECT taphouse.name as taphouseName, taphouse.id as taphouseId, brewery.name as breweryName, beer.name, beer_on_tap.pintPrice, beer_on_tap.growlerPrice, beer_on_tap.id FROM brewery INNER JOIN beer ON brewery.id=beer.brewery INNER JOIN beer_on_tap ON beer.id=beer_on_tap.beer_id INNER JOIN taphouse ON taphouse.id=beer_on_tap.tap_id WHERE taphouse.id=${taphouse}`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error getting beers by taphouse.");
        return;
      }
      resolve(results);
    });
  });
};

exports.addBeerToTaphouse = function(tap_id, beer_id, pintPrice, growlerPrice) {
  //return new Promise(function(resolve, reject) {
    pool.query(SQL`INSERT INTO beer_on_tap(tap_id, beer_id, pintPrice, growlerPrice) VALUES (${tap_id},${beer_id},${pintPrice},${growlerPrice})`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error inserting into beer_on_tap table.");
        return;
      }
    //  resolve(results);
    //});  
  });
};

exports.removeBeerFromTaphouse = function(id) {
  //return new Promise(function(resolve, reject) {
    pool.query(SQL`DELETE FROM beer_on_tap WHERE id=${id}`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error deleting from beer_on_tap table.");
        return;
      }
    //  resolve(results);
    //});
  });
};

exports.getBeerLocations = function(beer) {
  return new Promise(function(resolve, reject) {
    pool.query(SQL`SELECT brewery.name as breweryName, beer.name as beerName, taphouse.name, taphouse.id as taphouseId, taphouse.city, taphouse.state FROM taphouse INNER JOIN beer_on_tap ON taphouse.id=beer_on_tap.tap_id INNER JOIN beer ON beer.id=beer_on_tap.beer_id INNER JOIN brewery ON beer.brewery=brewery.id WHERE beer.id=${beer}`, function(err, results, fields) {
      if (err) {
        console.log(err);
        console.log("Error getting beer locations.");
        return;
      }
      resolve(results);
    });
  });
};
