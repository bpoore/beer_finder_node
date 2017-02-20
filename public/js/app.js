//Grabs the URL including port # from the browser
var host = window.location.host;
var serverURL = "http://" + host;
console.log("serverURL = ", serverURL);

$(document).ready(function() {
    $("#submitTaphouse").on('click', function(event) {
        event.preventDefault();
        var name = $('#add_taphouse').find('input[name="name"]').val();
        var street_address = $('#add_taphouse').find('input[name="street_address"]').val();
        var city = $('#add_taphouse').find('input[name="city"]').val();
        var state = $('#add_taphouse').find('#state option:selected').val();
        var zip = $('#add_taphouse').find('input[name="zip"]').val();
        var queryString = `?name=${name}&street_address=${street_address}&city=${city}&state=${state}&zip=${zip}`;
        $.get(serverURL + '/taphouses' + queryString).done(window.location = serverURL + '/taphouses');
    });

    $("#submitBrewery").on('click', function(event) {
        event.preventDefault();
        if ($('#add_brewery').find('input[name="name"]').val() == "") {
            alert("Invalid brewery name, please try again");
        } else {
            var name = $('#add_brewery').find('input[name="name"]').val();
            var city = $('#add_brewery').find('input[name="city"]').val();
            var state = $('#add_brewery').find('#state option:selected').val();
            var queryString = `?name=${name}&city=${city}&state=${state}`;
            $.get(serverURL + '/breweries' + queryString).done(window.location = serverURL + '/breweries');
        }
    });

    $("#submitBeer").on('click', function(event) {
        event.preventDefault();
        if ($('#add_beer').find('input[name="name"]').val() == "") {
            alert("Invalid brewery name, please try again");
        } else {
            var name = $('#add_beer').find('input[name="name"]').val();
            var type = $('#add_beer').find('input[name="type"]').val();
            var alc_bv = $('#add_beer').find('input[name="alc_bv"]').val();
            var brewery = $('#add_beer').find('#brewery option:selected').val();
            var queryString = `?name=${name}&type=${type}&alc_bv=${alc_bv}&brewery=${brewery}`;
            $.get(serverURL + '/beers' + queryString).done(window.location = serverURL + '/beers');
        }
    });

    $("#submitBeerToLoc").on('click', function(event) {
        event.preventDefault();
        var taphouse_id = $('#addToLocation').find('input[name="taphouse_id"]').val();
        var beer_id = $('#addToLocation').find('#beer option:selected').val();
        var pint = $('#addToLocation').find('input[name="pintPrice"]').val();
        var growler = $('#addToLocation').find('input[name="growlerPrice"]').val();
        var queryString = `?taphouse_id=${taphouse_id}&beer_id=${beer_id}&pint=${pint}&growler=${growler}`;
        $.get(serverURL + '/on_tap' + queryString).done(window.location = `${serverURL}/on_tap?taphouse_id=${taphouse_id}`);
    });

    $("#on_tap").on("click", function(event) {
        event.preventDefault();
        var beer = event.target.id;
        var taphouse_id = $("#removeBeer").find('input[name="taphouse_id"]').val();
        console.log(`${beer} ${taphouse_id}`);
        $.get(`${serverURL}/on_tap?taphouse_id=${taphouse_id}&remove_beer=${beer}`).done(window.location = `${serverURL}/on_tap?taphouse_id=${taphouse_id}`);
    });
});
