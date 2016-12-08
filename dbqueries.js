var mysql = require('mysql');
var SQL = require('sql-template-strings');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'password',
  database        : 'beer_finder'
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