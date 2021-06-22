# earthquake-geojson-leaflet-map
Demonstration of skills in utilizing Leaflet with GeoJSON files.  The 17th challenge of the University of Minnesota's Data Analysis and Data Visualization Bootcamp.  

This site shows a leaflet map displaying earthquake data (magnitude, location, and depth) with options on how to display the map background (data provided by the USGS GeoJSON Feed).  Tectonic plates are also displayed on the map (provided by https://github.com/fraxen/tectonicplates).  

## How to Run
Leaflet-Step-2 displays the full functionality of the site, while Leaflet-Step-1 has the same functionality without as many map layer options and without the ability to turn on/off tectonic plate data.

In order to run this code, you will need to do the following before accessing the site:
1. Get a mapbox API key, which can be obtained here: https://www.mapbox.com/ 
2. Create a file called "config.js" in either Leaflet-Step-2/static/js or Leaflet-Step-1/static/js, depending on desired functionality.  If you are unsure which to use, default to the Leaflet-Step-2 folder.
3. In the config.js file, create a variable called "API_Key" and assign your mapbox API key to it.
4. Once the above is completed, you'll be able to access the site at https://nbullerds.github.io/earthquake-geojson-leaflet-map/Leaflet-Step-2/
