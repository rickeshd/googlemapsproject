var map;
var markers = ko.observableArray([]);
// function ViewModel() {
//   places = ko.observableArray([
//         ['Palace of Fine Arts Theatre', 37.802857, -122.449362],
//         ['Dolores Park', 37.759798, -122.427235],
//         ['de Young Museum', 37.771345, -122.468667],
//         ['Pier 39', 37.808752, -122.409952],
//         ['Exploratorium', 37.800762, -122.398582],
//         ['Market Street', 37.788697, -122.402179],
//         ['Coit Tower', 37.802377, -122.405862]
//     ]);
// }

function initMap() {
    var myLatLng = {lat: 37.784463, lng: -122.431152};
  
	  map = new google.maps.Map(document.getElementById('map'), {
    	  center: myLatLng,
    	  zoom: 14
  	});
    places = ko.observableArray([
        ['Palace of Fine Arts Theatre', 37.802857, -122.449362],
        ['Dolores Park', 37.759798, -122.427235],
        ['de Young Museum', 37.771345, -122.468667],
        ['Pier 39', 37.808752, -122.409952],
        ['Exploratorium', 37.800762, -122.398582],
        ['Market Street', 37.788697, -122.402179],
        ['Coit Tower', 37.802377, -122.405862]
    ]);

    for (var i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
            position: {lat: places[i][1], lng: places[i][2]},
            map: map,
            title: places[i][0]
        });
        markers.push(marker);     
    }
}
ko.applyBindings(new initMap());


