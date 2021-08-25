// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(response) {
    console.log(response.features);
    let earthquakes = response.features;
    console.log(earthquakes[0].geometry.coordinates)
    for (var i=0; i<earthquakes.length; i++) {
        coords = [earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]];
        depth = earthquakes[i].geometry.coordinates[2];
        magnitude = earthquakes[i].properties.mag;
        console.log(getColor(depth));
        var circle = L.circle(coords,{
        color: getColor(depth),
        fillColor: getColor(depth),
        weight:1,
        fillOpacity: 0.7,
        radius: (20000*magnitude)
      }).addTo(myMap);
    }


    // fix syntax and geojson data
    // for earthquake in data {
    //   var circle = L.circle(coords,{
    //     color: depth,
    //     fillOpacity: 0.5,
    //     radius: magnitude
    //   }).addTo(myMap);
    //   popupText = ;
    //   circle.bindPopup(popupText);

    // };

});

function getColor(depth) {
    if (depth < 10) {
        var color = "LightGreen";
    } else if (depth < 30) {
        var color = "YellowGreen";
    } else if(depth < 50) {
        var color = "Yellow";
    } else if(depth < 70) {
        var color = "Orange";
    } else if (depth < 90){
        var color = "OrangeRed";
    } else {
        var color = "Red";
    }
    return color;
}



// creates legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    text = ['<h3>Legend</h3>'];
    text.push('Size : magnitude');
    text.push(' Green<->Red : Shallow<->Deep')
    div.innerHTML = text.join('<br>');
    return div;
    console.log(div.innerHTML)
};
legend.addTo(myMap);