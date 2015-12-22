var map;
var $body = $('body');
var $wikiContainer = $('#wikicontainer');
//var markers = ko.observableArray([]);
//    ['Palace of Fine Arts Theatre', 37.802857, -122.449362],
//     ['Dolores Park', 37.759798, -122.427235],
//     ['de Young Museum', 37.771345, -122.468667],
//     ['Pier 39', 37.808752, -122.409952],
//     ['Exploratorium', 37.800762, -122.398582],
//     ['Market Street', 37.788697, -122.402179],
//     ['Coit Tower', 37.802377, -122.405862]
// ];
var places = [
    {
        name: 'Palace of Fine Arts Theatre',
        latitude: 37.802857,
        longitude: -122.449362,
        wikiUrl: 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Palace of Fine Arts Theatre' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'Dolores Park',
        latitude: 37.759798,
        longitude: -122.427235,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Dolores Park' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'de Young Museum',
        latitude: 37.771345,
        longitude: -122.468667,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'de Young Museum' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'Pier 39',
        latitude: 37.808752,
        longitude: -122.409952,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Pier 39' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'Exploratorium',
        latitude: 37.800762,
        longitude: -122.398582,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Exploratorium' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'Market Street',
        latitude: 37.788697,
        longitude: -122.402179,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Market Street' + 
        '&srnamespace=0&srprop=snippet&srlimit=10&imlimit=1'
    },
    {
        name: 'Coit Tower',
        latitude: 37.802377,
        longitude: -122.405862,
        wikiUrl: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + 'Coit Tower' + 
        '&srnamespace=0&srprop=snippet&srlimit=100&imlimit=10'
    }
 ]

// add map and markers to map
var initMap = function() {
    var myLatLng = {lat: 37.784463, lng: -122.431152};
  
	  map = new google.maps.Map(document.getElementById('map'), {
    	  center: myLatLng,
    	  zoom: 14
  	});
    for (var i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
            position: {lat: places[i].latitude, lng: places[i].longitude},
            map: map,
            title: places[i].name
        });
        //markers.push(marker);     
    }
}

// this.queryResults = ko.observable();
// ko.computed(function() {
//     // Whenever "pageIndex", "sortColumn", or "sortDirection" change, this function will re-run and issue
//     // an Ajax request. When the Ajax request completes, assign the resulting value to "queryResults"
//     $.ajax("someUrl", {
//         data: { pageNum: this.pageIndex, sortBy: this.sortColumn, sortDirection: this.sortOrder },
//         success: this.queryResults
//     });
// }, this);



var ViewModel = function () {
    var self = this;

    this.placesList = ko.observableArray([]);


    // this.loadWiki = ko.computed(function() {
    //    $.ajax(data, {
    //         dataType: "jsonp",
    //         success: function(response) {
    //             this.resultTitle = (response.query.search[0].title);
    //             this.resultSnippet = (response.query.search[0].snippet);
    //         }
    //     });
    // })

    places.forEach(function(place) {
        self.placesList.push(place);
    });

    this.currentWiki = ko.observable();

    this.setWiki = function(clickedPlace) {
        $.ajax(clickedPlace.wikiUrl, {
            dataType: "jsonp",
            success: function(response) {
                this.title = (response.query.search[0].title);
                this.snippet = (response.query.search[0].snippet);
                self.currentWiki(this.snippet);
            }
        });
    };
}
ko.applyBindings(new ViewModel());



// var wikiUrl = ('https://en.wikipedia.org/w/api.php?action=opensearch&search='+ places[0][0] +'&format=json&callback=wikiCallback');



