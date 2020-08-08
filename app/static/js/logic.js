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