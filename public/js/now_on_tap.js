function initMap(beersByLoc) {
  var beers = JSON.parse(beersByLoc);
  console.log(typeof(beers));
  var  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.523062, lng: -122.676482},
      zoom:11
  });

  var infoWindow = new google.maps.InfoWindow;
  downloadUrl("gen_xml_on_tap.php", function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    var names = xml.documentElement.getElementsByTagName("name");
    var addresses = xml.documentElement.getElementsByTagName("street_address");
    var lat = xml.documentElement.getElementsByTagName("lat");
    var lng = xml.documentElement.getElementsByTagName("lng");
    var beers = xml.documentElement.getElementsByTagName("beers");
    for (var i = 0; i < markers.length; i++) {
      var name = names[i].innerHTML;
      var address = addresses[i].innerHTML;
      on_tap = "_______________________________<br/>";
      if(beers[i].innerHTML != "") {
        var beer = beers[i].getElementsByTagName("beer");
        var beer_names = beers[i].getElementsByTagName("beer_name");
        var breweries = beers[i].getElementsByTagName("brewery");
        for(var x=0; x<beer.length; x++) {
          var beer_name = beer_names[x].innerHTML;
          var brewery = breweries[x].innerHTML;
          on_tap += brewery + " " + beer_name +"<br/>";
        } 
      }
      else {
        on_tap += "Add beer!";
      }
      var point = new google.maps.LatLng(
          parseFloat(lat[i].innerHTML),
          parseFloat(lng[i].innerHTML));
      var html = "<b>" + name + "</b> <br/>" + address + "<br/>" + on_tap;
      var marker = new google.maps.Marker({
        map: map,
        position: point
      });
      bindInfoWindow(marker, map, infoWindow, html);
    }
  });
}
function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
// }
// function downloadUrl(url, callback) {
//   var request = new XMLHttpRequest;
//   request.onreadystatechange = function() {
//     if (request.readyState == 4) {
//       request.onreadystatechange = doNothing;
//       callback(request, request.status);
//     }
//   };
//   request.open('GET', url, true);
//   request.send(null);
// }
function doNothing() {}