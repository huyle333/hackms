var map;

function initialize() {
    var mapOptions = {
        center: { lat: 39.8282, lng: -98.5795},
        zoom: 5,
        mapTypeControl: false
    };

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

$("#button").click(function(){
	var location = new google.maps.LatLng(42.360082, -71.05888);
	var locationMarker = new google.maps.Marker({
        icon: ('http://maps.google.com/mapfiles/kml/pal2/icon2.png'),
        position: location,
        map: map,
        title: "I need help"
    });
    map.setZoom(17);
    map.panTo(locationMarker.position);
});