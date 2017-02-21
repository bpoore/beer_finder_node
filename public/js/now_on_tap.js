function initMap(beer_by_location, taps) {
  var beersByLoc = JSON.parse(beer_by_location);
  var taps = JSON.parse(taps);

  var mapData = []
  for(var i=0; i<taps.length; i++) {
    var name = taps[i].name;
    var street_address = taps[i].street_address;
    var lat = taps[i].lat;
    var lng = taps[i].lng;
    var beers = [];
    for(var j=0; j<beersByLoc.length; j++) {
      if(taps[i].id == beersByLoc[j].tap_id) {
        beers.push({
          beerName: beersByLoc[j].beerName,
          breweryName: beersByLoc[j].breweryName
        })  
      }
    }
    mapData.push({
      name: name,
      street_address: street_address,
      lat: lat,
      lng: lng,
      beers: beers
    })
  }

  
  var  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.523062, lng: -122.676482},
      zoom:11
  });

  var infoWindow = new google.maps.InfoWindow;

  for (var i = 0; i < mapData.length; i++) {
    var name = mapData[i].name;
    var address = mapData[i].street_address;
    on_tap = "_______________________________<br/>";
    if(mapData[i].beers.length != 0) {
      for(var x=0; x<mapData[i].beers.length; x++) {
        var beerName = mapData[i].beers[x].beerName;
        var brewery = mapData[i].beers[x].breweryName;
        on_tap += brewery + " - " + beerName + "<br/>";
      }
    } else {
      on_tap += "Add beer!";
    }
    var point = new google.maps.LatLng(parseFloat(mapData[i].lat), parseFloat(mapData[i].lng));
    var html = "<b>" + mapData[i].name + "</b> <br/>" + mapData[i].street_address + "<br/>" + on_tap;
    var marker = new google.maps.Marker({
      map: map,
      position: point
    });
    bindInfoWindow(marker, map, infoWindow, html);
  }
}

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
};

function doNothing() {}