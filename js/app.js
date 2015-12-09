var map;
function initMap() {
	var myLatLng = {lat: 37.784463, lng: -122.431152};
  
	map = new google.maps.Map(document.getElementById('map'), {
    	center: myLatLng,
    	zoom: 14
  	});

    var marker1 = new google.maps.Marker({
  		position: {lat: 37.802857, lng: -122.449362},
  		map: map,
  		title: 'Palace of Fine Arts Theatre'
  	});
  	    var marker2 = new google.maps.Marker({
  		position: {lat: 37.759798, lng: -122.427235},
  		map: map,
  		title: 'Dolores Park'
  	});
  	    var marker3 = new google.maps.Marker({
  		position: {lat: 37.771345, lng: -122.468667},
  		map: map,
  		title: 'de Young Museum'
  	});

    google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
	});
}


function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });
}

// var drawingManager = new google.maps.drawing.DrawingManager();
// drawingManager.setMap(map);




