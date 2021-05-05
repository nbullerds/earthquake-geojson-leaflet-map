// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    
    // An array which will be used to store created quakeMarkers
    var quakeMarkers = []
    earthquakeData.forEach(function (quake) {
        var lng = quake.geometry.coordinates[0];
        var lat = quake.geometry.coordinates[1];
        var rad = quake.properties.mag * 30000;
        quakeMarkers.push(
            L.circle([lat, lng],{
                weight: 1,
                fillOpacity: 1,
                color: "black",
                fillColor: "yellow",
                radius: rad
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3><hr><h4>Magnitude: " + quake.properties.mag +"</h4><p>" + new Date(quake.properties.time) + "</p>")
        );
        
    });

    var quakeLayer = L.layerGroup(quakeMarkers);

    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    // Create our map object
    L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [lightMap, quakeLayer]
    });

}
