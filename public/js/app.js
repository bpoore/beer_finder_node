//Grabs the URL including port # from the browser
var host = window.location.host;
var serverURL = "http://" + host; 
console.log ("serverURL = ", serverURL);

$(document).ready(function () {
	$("#submitTaphouse").on('click', function (event) {
		event.preventDefault();
		var name = $('#add_taphouse').find('input[name="name"]').val();
		console.log(name);
		console.log(typeof(name));
		console.log(name.length);
		var street_address = $('#add_taphouse').find('input[name="street_address"]').val();
		console.log(street_address);
		var city = $('#add_taphouse').find('input[name="city"]').val();
		console.log(city);
		var state = $('#add_taphouse').find('input[name="state"]').val();
		console.log(state);
		var zip = $('#add_taphouse').find('input[name="zip"]').val();
		console.log(zip);
		var queryString = `?name=${name}&street_address=${street_address}&city=${city}&state=${state}&zip=${zip}`;
		console.log(queryString);
		$.get(serverURL + '/add_taphouse' + queryString);
		//	.done(window.location = serverURL + userType);
	});
});
