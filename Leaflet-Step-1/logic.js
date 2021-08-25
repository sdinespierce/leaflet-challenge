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
d3.json(link).then(function(data) {
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