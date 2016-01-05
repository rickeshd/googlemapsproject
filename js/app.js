var map;
var $body = $('body');
var $wikiContainer = $('#wikicontainer');
var markers = [];

var places = [
    {
        name: 'Palace of Fine Arts Theatre',
        latitude: 37.802857,
        longitude: -122.449362,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Palace%20of%20Fine%20Arts'
    },
    {
        name: 'Dolores Park',
        latitude: 37.759798,
        longitude: -122.427235,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Dolores%20Park'
    },
    {
        name: 'de Young Museum',
        latitude: 37.771345,
        longitude: -122.468667,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=De%20Young%20%28museum%29'
    },
    {
        name: 'Pier 39',
        latitude: 37.808752,
        longitude: -122.409952,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Pier%2039'
    },
    {
        name: 'Exploratorium',
        latitude: 37.800762,
        longitude: -122.398582,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Exploratorium'
    },
    {
        name: 'Market Street',
        latitude: 37.788697,
        longitude: -122.402179,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Market%20Street%20(San%20Francisco)'
    },
    {
        name: 'Coit Tower',
        latitude: 37.802377,
        longitude: -122.405862,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=2&exlimit=1'+
        '&explaintext=&exsectionformat=plain&titles=Coit%20Tower'
    }
 ]

// add map and markers to map
var initMap = function() {
    // center of map
    var myLatLng = {lat: 37.784463, lng: -122.431152};
        // add map
	map = new google.maps.Map(document.getElementById('map'), {
    	center: myLatLng,
    	zoom: 14
  	});
    // add markers
    var infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
            position: {lat: places[i].latitude, lng: places[i].longitude},
            map: map,
            title: places[i].name,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent();
                infowindow.open(map, marker);

            }
        })(marker, i));

        markers.push(marker);
    }
    console.log(markers);
    function toggleBounce(marker) {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } 
            else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
    }
    // for (e in markers) {
    //     
    // }
}

var x = []


var Place = function(data) {

    var self = this;
    this.name = ko.observable(data.name);
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.wikiUrl = data.wikiUrl

    this.setWiki = (function() {
        $.ajax(data.wikiUrl, {
            dataType: "jsonp",
            success: function(response) {
                var pageObject = (response.query.pages);
                var pageObjectProperty = (Object.keys(pageObject));
                var extracts = (response.query.pages[pageObjectProperty].extract);
                extracts = self.setwiki;
            }
        });
    })();
};




// var setWiki = function(place) {
//     for (var i = 0; i < places.length; i++) {
//         $.ajax(place[i].wikiUrl, {
//             dataType: "jsonp",
//             success: function(response) {
//                 this.pageObject = (response.query.pages);
//                 this.pageObjectProperty = (Object.keys(this.pageObject));
//                 this.extract = (response.query.pages[this.pageObjectProperty].extract);
//                 self.currentWiki(this.extract);
//                 x.push(this.extract);
//             }
//         });
//     }
// };


var ViewModel = function () {
    var self = this;
    // add all places to observable array to be displayed on main page
    this.placesList = ko.observableArray([]);

    places.forEach(function(placeItem) {
        self.placesList.push(new Place(placeItem));
    });

    console.log(self.placesList()[0].name());
    this.currentWiki = ko.observable();

    this.setWikiExtract = function(clickedCat) {
        self.currentWiki(clickedCat);
    };

    // this.currentWiki = ko.observable();
    // // ajax request from Wikipedia for 2 sentence extract of clicked place
    // this.setWiki = function(clickedPlace) {
    //     $.ajax(clickedPlace.wikiUrl, {
    //         dataType: "jsonp",
    //         success: function(response) {
    //             this.pageObject = (response.query.pages);
    //             this.pageObjectProperty = (Object.keys(this.pageObject));
    //             this.extract = (response.query.pages[this.pageObjectProperty].extract);
    //             self.currentWiki(this.extract);
    //             x = this.extract;
    //         }
    //     });
    // };
}
ko.applyBindings(new ViewModel());


