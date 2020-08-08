// Create map object

var myMap = L.map('map', {
    center: [40.78222, -73.9741874],
    zoom: 15
});

// Add tile layer

L.titleLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
}).addTo(myMap);

d3.json("/coordinates" function (response) {

    console.log(response);

    var heatArray = [];

    for (var i = 0; i < response.length; i++) {
        var location = response[i].location;

        if (location) {
            heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
    }

    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);

});