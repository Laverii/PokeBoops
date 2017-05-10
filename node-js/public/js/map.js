//make a variable for map (follows tutorial for http://leafletjs.com/reference.html#map-constructor)
 			var lostMap = L.map('lostMap', {scrollWheelZoom:true}).setView([32.8801, -117.2340], 15);

 			//render map onto our page (followed tutorial on http://leafletjs.com/examples/quick-start/ and http://uafrazier.github.io/leaflet-basics/ )
 			//tile set from https://leaflet-extras.github.io/leaflet-providers/preview/index.html
 			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
 			}).addTo(lostMap);