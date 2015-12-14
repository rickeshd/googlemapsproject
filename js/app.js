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
// var wikiUrl = ('https://en.wikipedia.org/w/api.php?action=opensearch&search='+ places[0][0] +'&format=json&callback=wikiCallback');
var $wikiContainer = $('#wikicontainer');
// function loadWiki() {   
//        $.ajax(wikiUrl, {
//         dataType: "jsonp",
//         success: function(response) {
//             for (var i = 0; i < response.length; i++) {
//                 var articles = response[i];
//                 var url = 'http://en.wikipedia.org/wiki/' + articles;
//                 $wikiContainer.append('<a href="' + url + '">' + articles + '</a>');
//             };
//         }
//     });
// }

var newWikiUrl = ('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=DoloresPark&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1');
function loadNewWiki() {   
       $.ajax(newWikiUrl, {
        dataType: "jsonp",
        success: function(response) {
            console.log(response.query.search[0].title);
            console.log(response.query.search[0].snippet);
            $wikiContainer.append(response.query.search[0].title);
            $wikiContainer.append(response.query.search[0].snippet);
        }
    });
}
// loadWiki();
loadNewWiki()