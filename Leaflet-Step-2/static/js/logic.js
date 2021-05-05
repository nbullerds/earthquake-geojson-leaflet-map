// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createMap(data.features);
});

function getColor(d){
    return d >= 90  ? '#A63603' :
           d >= 70  ? '#E6550D' :
           d >= 50   ? '#FD8D3C' :
           d >= 30   ? '#FDAE6B' :
           d >= 10   ? '#FDD0A2' :
                      '#FEEDDE';
}

function createMap(earthquakeData) {
    
    // An array which will be used to store created quakeMarkers
    var quakeMarkers = []
    earthquakeData.forEach(function (quake) {
        var lng = quake.geometry.coordinates[0];
        var lat = quake.geometry.coordinates[1];
        var depth = quake.geometry.coordinates[2];
        var mag = quake.properties.mag * 30000;
        quakeMarkers.push(
            L.circle([lat, lng],{
                weight: 1,
                fillOpacity: 1,
                color: "black",
                fillColor: getColor(depth),
                radius: mag
            }).bindPopup("<h3>" + quake.properties.place +
            "</h3><hr><h4>Magnitude: " + quake.properties.mag +", Depth: " + depth + "</h4><p>" + new Date(quake.properties.time) + "</p>")
        );
        
    });

    var quakeLayer = L.layerGroup(quakeMarkers);

    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-streets-v11",
        accessToken: API_KEY
    });

    var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });

      // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Satellite": satelliteMap,
        "Grayscale": grayscaleMap,
        "Outdoors" : outdoorMap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        "Earthquakes": quakeLayer,
        //"Tectonic Plates":  
    };

    // Create our map object
    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [satelliteMap, quakeLayer]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map){

        var div = L.DomUtil.create('div', 'info legend');
        var grades = [-10, 10, 30, 50, 70, 90];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);
}