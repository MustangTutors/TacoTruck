var geocoder;
var map;
function initialize(locations) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(32.84200, -96.782460);
  var mapOptions = {
    zoom: 12,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  codeAddresses(locations);
}

function codeAddresses(locations) {
  for (var i in locations) {
    var name = locations[i].name;
    var address = locations[i].address;
    var city = locations[i].city;
    var state = locations[i].state;
    var zipcode = locations[i].zipcode;
    var combinedAddress = address + ", " + city + ", " + state;
    var info = "<h3>" + name + "</h3>" + "<p>" + combinedAddress + ", " + zipcode + "</p>";
    var zip = {'postalCode': zipcode};
    var options = { 'address': combinedAddress, componentRestrictions: zip };
    geocoder.geocode( options, geocodeCallback(name, info) );
  }
}

function geocodeCallback(name, info) {
  return function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: name
        });
        
        google.maps.event.addListener(marker, 'click', function() {
          var infowindow = new google.maps.InfoWindow({
              content: info
          });
          infowindow.open(map,marker);
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
  }
}

window.addEventListener('load', function() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if(request.readyState === 4) {
          initialize(JSON.parse(request.responseText)); 
      }
  }
  request.open("GET", "api/locations", true);
  request.send();
});