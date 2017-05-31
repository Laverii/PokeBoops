Milestone 14, Team PokeBoops

Inkan: I went to Alok and Kandarp's office hours to try to get the shapes to be saved onto JSON database, and they helped me try to find the shape values. I also went to Chen's office hours for debugging help and for database help, in which he suggested to switch to localStorage to share the shape value and showed me how. A friend outside of the class also explained to me more about localstorage and the functions that can be used, and with that I was able to make the functions that can save and load the forms and drawn shapes be saved onto localStorage. While it can only persist on my machine, the data is at least saved to the browser. This will work for all shapes, which is circle, polyline, and marker. I was also able to set the colors of the shapes, which is red for lost and blue for fun and have that saved as well. I also did some editting to the html and index.js files, which are getting rid of the list and found form on the bottom of the homepage as well as setting marker to be found only. I tried to work on the delete button a little bit, but I couldn't get it to work. I also made a small development plan to structure what could be worked on.

Austin: I attempted to find ways in which the local storage could be modified to include keys (pointing to specific item posts and corresponding coordinates/shapes). In doing so I hoped to get the delete/remove functionality done for item postings created previously (as well as editing functionality), particularly by adding to the Leaflet.Draw methods already in place for removing/altering layers. I looked at some sources that gave hints at what could be done regarding local storage, though these only seemed to include modifications to traversals with indices (https://stackoverflow.com/questions/6575755/javascript-unique-identifier-for-local-storage & https://stackoverflow.com/questions/12275247/get-id-by-key-in-localstorage). Unfortunately, I was unable to implement a complete fix into the Lost and Found application.

App functionality: This app's primary purpose is to be a Lost on Found app. Everything can be done on the home page. If the user lost or found the item, they can make a posting on the map. They can do this by pressing the circle (if they want to estimate the area the item was located), the polyline (if they want to backtrack), and marker (if they want to indicate the exact location of the item. Since most users who lost an item wouldn't know where it was located exactly, ths option is left for found only). It will open a popup, asking the user if the item is lost or found. If they press lost, the shape will be red. If found, the shape will be blue. They can fill out the form saying what item they found, a description of it, as well as their contact information (such as name, phone number, and address. THis wiil allow others who look at the post to see who they can contact if they found their item, or for others to contact them if they lost an item). The post then submits and will stay on the map for others to look at. Since it is on local storage, this can only exist on one browser. Users can also search locations of where they can possibly lost their item, and make a post there.

Sources (cumulative):
Sources are also found in the main code as well (within the node-js files, such as node-js/ajax and node-js/public).
Websites and outside sources:
Search Addresses: https://github.com/derickr/osm-tools/tree/master/leaflet-nominatim-example/js
Leaflet Tutorial: http://leafletjs.com/reference.html#map-constructor
Leaflet.Draw: https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw
Leaflet.Draw API: https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
Map Rendering:  http://leafletjs.com/examples/quick-start/ and http://uafrazier.github.io/leaflet-basics/
Tile Set: https://leaflet-extras.github.io/leaflet-providers/preview/index.html
Toolbar/Draw shapes: Followed basic.html in the leaflet_draw/Leaflet.draw-master/examples/basic.html
Popup: Popup: http://leafletjs.com/reference-1.0.3.html#popup; https://github.com/Leaflet/Leaflet/issues/1612
Leaflet SetStyle: https://gis.stackexchange.com/questions/75590/setstyle-function-for-geojson-features-leaflet
GetElementId: http://stackoverflow.com/questions/3547035/javascript-getting-html-form-values
Layers: http://leafletjs.com/reference-1.0.3.html#layer
Map Events: http://leafletjs.com/reference-1.0.3.html#map-event
Edit: https://github.com/Leaflet/Leaflet.draw/issues/395
LocalStorage: https://www.w3schools.com/html/html5_webstorage.asp
Retrieving layer Information additional help: https://stackoverflow.com/questions/18014907/leaflet-draw-retrieve-layer-type-on-drawedited-event
Tutorial start up: http://leafletjs.com/examples/quick-start/ 
Popup reference: http://bl.ocks.org/uafrazier/d589caa322f1b1e7c651
Boostrap file: https://v4-alpha.getbootstrap.com/getting-started/introduction/
Form tutorial link: https://www.tutorialspoint.com/html/html_forms.htm
Tutorial for forms: https://www.w3schools.com/js/js_input_examples.asp         
Tutorial for php and forms: https://www.w3schools.com/php/php_forms.asp
Make a submit button : https://www.w3schools.com/tags/att_button_formmethod.asp
Making lists: https://v4-alpha.getbootstrap.com/components/list-group/ 

Attempting to make a search bar to make items: https://stackoverflow.com/questions/10083098/loop-search-through-all-items-in-localstorage; https://stackoverflow.com/questions/2166765/search-an-array-for-matching-attribute; https://stackoverflow.com/questions/37638200/how-to-convert-json-string-values-to-lowercase-in-javascript; https://stackoverflow.com/questions/28636723/how-to-clear-leaflet-map-of-all-markers-and-layers-before-adding-new-ones

TA's and individual help:
Alok and Kandarp: Ajax and databases, they helped us get our data posted onto the website. Also helped Inkan with debugging and helping us get shape properties.
Chen: Inkan went to his office hours to get help on databases (like Keeling), debugging, and localstorage. 
Professor Guo: Helped Inkan with sourcing the leaflet.Draw files correctly so we can make the toolbar
Inkan's friend: A friend from outside the class. He introduced/helped me understand Leaflet popups, setStyle/color, shapes, and getting elementIds. He also helped me understand more about localstorage too.