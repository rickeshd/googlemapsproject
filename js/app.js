var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7669, lng: -122.43168},
    zoom: 15
  });
}
var drawingManager = new google.maps.drawing.DrawingManager();
drawingManager.setMap(map);

