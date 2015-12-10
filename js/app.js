var map;
//var markers = ko.observableArray([]);
var places = [
    ['Palace of Fine Arts Theatre', 37.802857, -122.449362],
    ['Dolores Park', 37.759798, -122.427235],
    ['de Young Museum', 37.771345, -122.468667],
    ['Pier 39', 37.808752, -122.409952],
    ['Exploratorium', 37.800762, -122.398582],
    ['Market Street', 37.788697, -122.402179],
    ['Coit Tower', 37.802377, -122.405862]
];

// add map and markers to map
var initMap = function() {
    var myLatLng = {lat: 37.784463, lng: -122.431152};
  
	  map = new google.maps.Map(document.getElementById('map'), {
    	  center: myLatLng,
    	  zoom: 14
  	});
    for (var i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
            position: {lat: places[i][1], lng: places[i][2]},
            map: map,
            title: places[i][0]
        });
        //markers.push(marker);     
    }
}

var ViewModel = function () {
    var self = this;

    this.placesList = ko.observableArray([]);

    places.forEach(function(place) {
        self.placesList.push(place);
    });
}
ko.applyBindings(new ViewModel());


