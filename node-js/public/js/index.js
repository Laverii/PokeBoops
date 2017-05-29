/* Credit to Derick Rethans https://github.com/derickr/osm-tools/tree/master/leaflet-nominatim-example/js */

var lostMap;
var feature;

function load_map() {
    $('#foundDiv').hide();
	lostMap = L.map('lostMap', {scrollWheelZoom:true}).setView([32.8801, -117.2340], 15);

    /* Script to make the map variable */ 
    //make a variable for map (follows tutorial for http://leafletjs.com/reference.html#map-constructor)
    /* Leaflet Draw section. Draw allows the user to draw images on the map such as lines, shapes, and circle.
			
    leaflet draw here: https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw
    leaflet Draw API: https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html

    Followed  a tutorial based on basic.html file in the examples folder of leaflet.Draw (leaflet_Draw/Leaflet.Draw/example/basic.html)
    as well as the api.
	*/
    
    //render map onto our page (followed tutorial on http://leafletjs.com/examples/quick-start/ and http://uafrazier.github.io/leaflet-basics/ )
    //tile sets from https://leaflet-extras.github.io/leaflet-providers/preview/index.html
    L.control.layers({ "Populated": L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(lostMap),
        "Standard": L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', { 
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
    }).addTo(lostMap);
    
            var drawnItems = new L.FeatureGroup();
			lostMap.addLayer(drawnItems);
            
            //L.control.layers({'drawlayer':drawnItems}, {position: 'topright', collapsed: false}).addTo(lostMap);

			var drawControl = new L.Control.Draw({
				draw:
				{
					polyline: true,
					polygon: false,
                    rectangle: false,
					circle: true,
					marker: true
				},

				edit:
				{
					featureGroup: drawnItems
				}
			});
            
			lostMap.addControl(drawControl);
    loadShapes(drawnItems);
    //Inkan: Saving data of the stored map shapes using geoJSON.
    //Got help from: https://gist.github.com/Bouni/8518273
    //ALso from: https://github.com/Leaflet/Leaflet.draw/issues/253
    //GOt help from Chen here as well, suggested using localstorage which is done below
    // in storeShape and loadShapes functions
    /*var json = drawnItems.toGeoJSON();
    function exportGeoJson(featureGroup)
    {
                var mapdata ={
                    "map": {
                        "center" : lostMap.getCenter(),
                        "zoom": lostMap.getZoom()
                    },
                    "geoJson": {
                        "type": "FeatureCollection", "features":[]
                    }
                }

                featureGroup.eachLayer(function(layer){
                    feature = layer.toGeoJSON()
                    if(layer._mRadius != undefined){
                        feature.properties.radius = layer._mRadius;
                    }
                    feature.properties.style = {
                        "color" : layer.options.color
                    }
                    mapdata.geoJson.features.push(feature);
                })
                localStorage.setItem("mapdataLocal", JSON.stringify(mapdata));

                // target.val(JSON.stringify(mapdata));
    }

    function importGeoJson(targetLayer, mapdata){
                if(mapdata.lostMap && mapdata.map.center && mapdata.map.zoom){
                    map.setView([mapdata.lostMap.center.lat, mapdata.map.center.lng], mapdata.lostMap.zoom);
                }
                else{
                    lostMap.setView([32.8801, -117.2340]);
                }
                if(mapdata.geoJson && mapdata.geoJson.features){
                    L.geoJson(mapdata.geoJson.features, {
                        style: function(feature)
                    {
                        return feature.properties && feature.properties.style;
                    },
                    onEachFeature: function(feature, layer) {
                        if(feature.properties.radius != undefined){
                            L.circle([feature.geometry.coordinates[1], 
                                feature.geometry.coordinates[0]],
                                feature.properties.radius,
                                feature.properties.style).addTo(targetLayer);
                        }
                        else {
                            targetLayer.addLayer(layer);
                        }
                    }
                    })
                }
    }

    // importGeoJson(drawnItems, JSON.parse($("#mapdata").val()));
    importGeoJson(drawnItems, JSON.parse(localStorage.getItem("mapdataLocal")));
    //end geoJson export*/

    //found button clicked, it will open the form for found.
            

            lostMap.addControl(drawControl);
            lostMap.on(L.Draw.Event.CREATED, function (e) {
                var type = e.layerType;
                layer = e.layer;

                drawnItems.addLayer(layer);
                // exportGeoJson(drawnItems, $("#mapdata"));
                // exportGeoJson(drawnItems);

                if(type == 'circle')
                {
                    //Popup: http://leafletjs.com/reference-1.0.3.html#popup
                    //Inkan: THis popup asks if the item is lost or found.
                    var lostFound = new L.popup();
                    lostFound.setContent('<p>Is your item: <input type ="button" name = "goToLost" value = "Lost" id = "goto_lostForm"></input> or <input type= "button" name = "goToFound" value = "Found" id = "goto_foundForm"></input>');
                    layer.bindPopup(lostFound);

                    var foundClicked = function() {
                        //Get the submit button for found
                        var foundButton = document.getElementById('goto_foundForm');
                        //When clicked change the popup to the found form.
                        foundButton.onclick = function() {
                            var popup = new L.popup();
                            popup.setContent('<form id ="found_Form_Map" onsubmit="return submitFoundMap();"> <p>Item Name:</p> <input type ="text" name="item_name" id = "item_name_Map"></input><br><p>Description</p><br><textarea rows="6" cols="20" name = "description" id = "description_Map"></textarea><p>If you LOST this item, please contact:</p><br>Full Name: <input type ="text" name = "full_name" id ="full_name_Map"></input><br><p>Phone number:</p> <input type = "text" name = "phone_number" id = "phone_number_Map"></input><br><p>Email:</p><input type = "text" name = "email" id = "email_Map"></input><br><input type = "submit" name = "Post Found Item" value ="submit" id ="submit_Id_Map"></input></form>');
                                                
                            //Occurs when you submit the form. It takes that information and puts it on the popup.
                            //Helped by a friend of Inkan's, he help me understand popups and getting id values
                            //Chen helped with telling me to change id tags for foundData.jso
                            var submittedFoundForm = function() {   
                                //Gets submit button and gets popup elements
                                var button = document.getElementById('submit_Id_Map');
                                button.onclick = function () {
                                    //GetElementById form values: http://stackoverflow.com/questions/3547035/javascript-getting-html-form-values
                                    //Get form elements
                                    var itemName = document.getElementById('item_name_Map').value;
                                    var description = document.getElementById('description_Map').value;
                                    var fullName = document.getElementById('full_name_Map').value;
                                    var phoneNumber = document.getElementById('phone_number_Map').value;
                                    var email_address = document.getElementById('email_Map').value;
                                    //Make a new popup to print it all up
                                    var finalPopup = L.popup();
                                    //Set the popup with the new infromation
                                    var data = '<p>Item Name: ' + itemName + '<br>Description: ' +description+ '<br>If you LOST this please contact: <br> Name:' +fullName + '<br>Phone Number: '+ phoneNumber + '<br>Email: ' +email_address+ '</p>';
                                    finalPopup.setContent(data);


                                    //Closing popups: https://github.com/Leaflet/Leaflet/issues/1612
                                    //._popUp: A function of layer, allows it to grab the popup binded to it
                                    lostMap.closePopup(layer._popup);

                                    //closes old popup of the form and opens the new one with the information.
                                    layer.unbindPopup();
                                    layer.bindPopup(finalPopup);
                                    //Adds popup http://leafletjs.com/reference-1.0.3.html#layer
                                    lostMap.openPopup(finalPopup, layer.getLatLng());
                                    storeShape(layer,data);
                                                       
                                };
                                 //Takes off previous listener which is the form: http://leafletjs.com/reference-1.0.3.html#map-event
                                lostMap.off('popupopen', submittedFoundForm);
                            };
                            //Adds on new listener, which is the completed form: http://leafletjs.com/reference-1.0.3.html#map-event
                            lostMap.on('popupopen', submittedFoundForm);

                            //Closes popup with the question that asks if the item is lost or found.
                            lostMap.closePopup(layer._popup);

                            //removes the old popup and puts in new one
                            layer.unbindPopup();
                            layer.bindPopup(popup);

                            //opens the opup on the map.
                            lostMap.openPopup(popup, layer.getLatLng());
                        };
                        //Takes off the listener for the button asking if form is lost or found.
                        lostMap.off('popupopen', foundClicked);
                    };

                    //Adds listener which is that the found button was clicked.
                    lostMap.on('popupopen', foundClicked);



                    //found button clicked, it will open the form for found.
                    var lostClicked = function() {
                    //Get the submit button for found
                        var foundButton = document.getElementById('goto_lostForm');
                         //When clicked change the popup to the found form.
                        foundButton.onclick = function() {
                            var popup = new L.popup();
                            popup.setContent('<form id ="lost_Form_Map" "> <p>Item Name:</p> <input type ="text" name="item_name" id = "item_name"></text><br><p>Description</p><br><textarea rows="6" cols="20" name = "description" id = "description"></textarea><p>If you FOUND this item, please contact:</p><br>Full Name: <input type ="text" name = "full_name" id ="full_name"></input><br><p>Phone number:</p> <input type = "text" name = "phone_number" id = "phone_number"></input><br><p>Email:</p><input type = "text" name = "email" id = "email"></input><br><input type = "button" name = "Post Found Item" value ="submit" id ="submit_Id"></input></form>');
                            //layer.bindPopup(popup);
                                    
                            //Occurs when you submit the form. It takes that information and puts it on the popup.
                            var submittedlostForm = function() {   
                                //Gets submit button and gets popup elements
                                var button = document.getElementById('submit_Id');
                                button.onclick = function () {
                                //GetElementById form values: http://stackoverflow.com/questions/3547035/javascript-getting-html-form-values
                                //Get form elements
                                var itemName = document.getElementById('item_name').value;
                                var description = document.getElementById('description').value;
                                var fullName = document.getElementById('full_name').value;
                                var phoneNumber = document.getElementById('phone_number').value;
                                var email_address = document.getElementById('email').value;
                                //Make a new popup to print it all up
                                var finalPopup = L.popup();
                                var data = '<p>Item Name: ' + itemName + '<br>Description: ' +description+ '<br>If you FOUND this please contact: <br> Name:' +fullName + '<br>Phone Number: '+ phoneNumber + '<br>Email: ' +email_address+ '</p>';
                                //Set the popup with the new infromation
                                finalPopup.setContent(data);
                                

                                //Closing popups: https://github.com/Leaflet/Leaflet/issues/1612
                                //._popUp: A function of layer, allows it to grab the popup binded to it
                                lostMap.closePopup(layer._popup);

                                //closes old popup of the form and opens the new one with the information.
                                layer.unbindPopup();
                                layer.bindPopup(finalPopup);
                                //Adds popup http://leafletjs.com/reference-1.0.3.html#layer
                                lostMap.openPopup(finalPopup, layer.getLatLng());
                           
                                };
                                //Takes off previous listener which is the form: http://leafletjs.com/reference-1.0.3.html#map-event
                                lostMap.off('popupopen', submittedlostForm);
                                storeShape(layer, data);
                            };
                            //Adds on new listener, which is the completed form: http://leafletjs.com/reference-1.0.3.html#map-event
                            lostMap.on('popupopen', submittedlostForm);

                            //Closes popup with the question that asks if the item is lost or found.
                            lostMap.closePopup(layer._popup);

                            //removes the old popup and puts in new one
                            layer.unbindPopup();
                            layer.bindPopup(popup);

                            //opens the opup on the map.
                            lostMap.openPopup(popup, layer.getLatLng());
                            };
                            //Takes off the listener for the button asking if form is lost or found.
                            lostMap.off('popupopen', lostClicked);
                        };
                        //Adds listener which is that the found button was clicked.
                        lostMap.on('popupopen', lostClicked);
                            
                    }//end of circle for loop
                //GetLatLng isn't working well for polyline. The popup will close everytime the button is pressed but the process still works when you reopen it.
                if(type == 'polyline')
                {
                     //Popup: http://leafletjs.com/reference-1.0.3.html#popup
                        //Inkan: THis popup asks if the item is lost or found.
                        var lostFound = new L.popup();
                        lostFound.setContent('<p>Is your item: <input type ="button" name = "goToLost" value = "Lost" id = "goto_lostForm"></input> or <input type= "button" name = "goToFound" value = "Found" id = "goto_foundForm"></input>');
                        layer.bindPopup(lostFound);

                        //found button clicked, it will open the form for found.
                            var foundClicked = function() {
                                //Get the submit button for found
                                var foundButton = document.getElementById('goto_foundForm');
                                //When clicked change the popup to the found form.
                                foundButton.onclick = function() {
                                    var popup = new L.popup();
                                    popup.setContent('<form id ="found_Form"> <p>Item Name:</p> <input type ="text" name="item_name" id = "item_name"></text><br><p>Description</p><br><textarea rows="6" cols="20" name = "description" id = "description"></textarea><p>If you LOST this item, please contact:</p><br>Full Name: <input type ="text" name = "full_name" id ="full_name"></input><br><p>Phone number:</p> <input type = "text" name = "phone_number" id = "phone_number"></input><br><p>Email:</p><input type = "text" name = "email" id = "email"></input><br><input type = "button" name = "Post Found Item" value ="submit" id ="submit_Id"></input></form>');
                                    //layer.bindPopup(popup);
                                    
                                    //Occurs when you submit the form. It takes that information and puts it on the popup.
                                    var submittedFoundForm = function() {   
                                        //Gets submit button and gets popup elements
                                        var button = document.getElementById('submit_Id');
                                        button.onclick = function () {
                                        //GetElementById form values: http://stackoverflow.com/questions/3547035/javascript-getting-html-form-values
                                        //Get form elements
                                        var itemName = document.getElementById('item_name').value;
                                        var description = document.getElementById('description').value;
                                        var fullName = document.getElementById('full_name').value;
                                        var phoneNumber = document.getElementById('phone_number').value;
                                        var email_address = document.getElementById('email').value;
                                        //Make a new popup to print it all up
                                        var finalPopup = L.popup();
                                        //Set the popup with the new infromation
                                        finalPopup.setContent('<p>Item Name: ' + itemName + '<br>Description: ' +description+ '<br>If you LOST this please contact: <br> Name:' +fullName + '<br>Phone Number: '+ phoneNumber + '<br>Email: ' +email_address+ '</p>');
                                

                                        //Closing popups: https://github.com/Leaflet/Leaflet/issues/1612
                                        //._popUp: A function of layer, allows it to grab the popup binded to it
                                        lostMap.closePopup(layer._popup);

                                        //closes old popup of the form and opens the new one with the information.
                                        layer.unbindPopup();
                                        layer.bindPopup(finalPopup);
                                        //Adds popup http://leafletjs.com/reference-1.0.3.html#layer
                                        lostMap.openPopup(finalPopup, layer.getLatLng());
                           
                                    };
                                    //Takes off previous listener which is the form: http://leafletjs.com/reference-1.0.3.html#map-event
                                    lostMap.off('popupopen', submittedFoundForm);
                                };
                                //Adds on new listener, which is the completed form: http://leafletjs.com/reference-1.0.3.html#map-event
                                lostMap.on('popupopen', submittedFoundForm);

                                //Closes popup with the question that asks if the item is lost or found.
                                lostMap.closePopup(layer._popup);

                                //removes the old popup and puts in new one
                                layer.unbindPopup();
                                layer.bindPopup(popup);

                                //opens the opup on the map.
                                lostMap.openPopup(popup, layer.getLatLng());
                                
                                };
                                //Takes off the listener for the button asking if form is lost or found.
                                lostMap.off('popupopen', foundClicked);
                            };
                            //Adds listener which is that the found button was clicked.
                            lostMap.on('popupopen', foundClicked);

                             //found button clicked, it will open the form for found.
                            var lostClicked = function() {
                                //Get the submit button for found
                                var foundButton = document.getElementById('goto_lostForm');
                                //When clicked change the popup to the found form.
                                foundButton.onclick = function() {
                                    var popup = new L.popup();
                                    popup.setContent('<form id ="found_Form"> <p>Item Name:</p> <input type ="text" name="item_name" id = "item_name"></text><br><p>Description</p><br><textarea rows="6" cols="20" name = "description" id = "description"></textarea><p>If you FOUND this item, please contact:</p><br>Full Name: <input type ="text" name = "full_name" id ="full_name"></input><br><p>Phone number:</p> <input type = "text" name = "phone_number" id = "phone_number"></input><br><p>Email:</p><input type = "text" name = "email" id = "email"></input><br><input type = "button" name = "Post Found Item" value ="submit" id ="submit_Id"></input></form>');
                                    //layer.bindPopup(popup);
                                    
                                    //Occurs when you submit the form. It takes that information and puts it on the popup.
                                    var submittedlostForm = function() {   
                                        //Gets submit button and gets popup elements
                                        var button = document.getElementById('submit_Id');
                                        button.onclick = function () {
                                        //GetElementById form values: http://stackoverflow.com/questions/3547035/javascript-getting-html-form-values
                                        //Get form elements
                                        var itemName = document.getElementById('item_name').value;
                                        var description = document.getElementById('description').value;
                                        var fullName = document.getElementById('full_name').value;
                                        var phoneNumber = document.getElementById('phone_number').value;
                                        var email_address = document.getElementById('email').value;
                                        //Make a new popup to print it all up
                                        var finalPopup = L.popup();
                                        //Set the popup with the new infromation
                                        finalPopup.setContent('<p>Item Name: ' + itemName + '<br>Description: ' +description+ '<br>If you FOUND this please contact: <br> Name:' +fullName + '<br>Phone Number: '+ phoneNumber + '<br>Email: ' +email_address+ '</p>');
                                

                                        //Closing popups: https://github.com/Leaflet/Leaflet/issues/1612
                                        //._popUp: A function of layer, allows it to grab the popup binded to it
                                        lostMap.closePopup(layer._popup);

                                        //closes old popup of the form and opens the new one with the information.
                                        layer.unbindPopup();
                                        layer.bindPopup(finalPopup);
                                        //Adds popup http://leafletjs.com/reference-1.0.3.html#layer
                                        lostMap.openPopup(finalPopup, layer.getLatLng());
                           
                                    };
                                    //Takes off previous listener which is the form: http://leafletjs.com/reference-1.0.3.html#map-event
                                    lostMap.off('popupopen', submittedlostForm);
                                };
                                //Adds on new listener, which is the completed form: http://leafletjs.com/refrence-1.0.3.html#map-event
                                lostMap.on('popupopen', submittedlostForm);

                                //Closes popup with the question that asks if the item is lost or found.
                                lostMap.closePopup(layer._popup);

                                //removes the old popup and puts in new one
                                layer.unbindPopup();
                                layer.bindPopup(popup);

                                //opens the opup on the map.
                                lostMap.openPopup(popup, layer.getLatLng());
                                };
                                //Takes off the listener for the button asking if form is lost or found.
                                lostMap.off('popupopen', lostClicked);
                            };
                            //Adds listener which is that the found button was clicked.
                            lostMap.on('popupopen', lostClicked);
                }
                //If anything else is needed
                if(type == 'marker')
                {

                }
                drawnItems.addLayer(layer);
            });
        

    lostMap.on(L.Draw.Event.EDITED, function (e) {
        var layers = e.layers;
        var countOfEditedLayers = 0;
        exportGeoJson(drawnItems, mapdata);
        // exportGeoJson(drawnItems, $("#mapdata"));
        layers.eachLayer(function (layer) {
                countOfEditedLayers++;
        });
        console.log("Edited " + countOfEditedLayers + " layers");
    }); 

   

   //Inkan: Alok and kandarp helped here, gets the information of shapes
   //and records it on the log
    lostMap.on('draw:created', function (e) {
        // var layer = e.layer;
        // drawnItems.addLayer(layer);
        // exportGeoJson(drawnItems, $("#mapdata"));
        // alert("hello")
        console.log(e)
        if(e.layerType == "circle"){
            storeData({
                type: "circle",
                lat: e.layer.getLatLng().lat,
                lng: e.layer.getLatLng().lng,
                radius: e.layer.getRadius(),
                center: e.layer.getCenter
            })
        }else if(e.layerType == "polyline"){
            storeData({
                type: "polyline",
                //get multiple lines
                //bounds: e.layer.getBounds(),
                lat: e.layer.getLatLng().lat,
                lng: e.layer.getLatLng().lng,
            })

        }else if(e.layerType == "marker"){
            storeData({
                type: "marker",
                lat: e.layer.getLatLng().lat,
                lng: e.layer.getLatLng().lng,
                center: e.layer.getCenter
            })

        }
    });
}
//alok and kandarp helped here
function storeData(obj){
    console.log(obj)
}

//Inkan: I was helped by a friend, helped ne understand how to get information and save it.
var storeShape = function(layer, data){
    var shape = {
        data: data
    };

    if(layer instanceof L.Circle)
    {
        shape.LatLng = layer.getLatLng();
        shape.radius = layer.getRadius();
    }
    else if(layer instanceof L.Marker){
        shape.LatLng = layer.getLatLng();
    }
    else if(layer instanceof L.Polyline){
        shapes.LatLngs = layer.getLatLngs();
    }

    var storageInformation = localStorage.getItem("shapeInfo");
    if(storageInformation === null){
        storageInformation = [];
    }
    else {
        storageInformation = JSON.parse(storageInformation);
    }
    storageInformation.push(JSON.stringify(shape));
    localStorage.setItem("shapeInfo", JSON.stringify(storageInformation));

};

//loads the data aof the form and the shapes drawn that was on the map.
//Inkan: Was helped by a friend, helped me undestand on how to load shapes.
function loadShapes(drawnItems)
{
    var storageInformation = localStorage.getItem("shapeInfo");
    if(storageInformation !== null)
    {
        storageInformation = JSON.parse(storageInformation);
        for(var i = 0; i < storageInformation.length; i++)
        {
            var shape = JSON.parse(storageInformation[i]);
            if(shape.hasOwnProperty("radius"))
            {
                var circle = L.circle(shape.LatLng, shape.radius);
                var popup = L.popup();
                popup.setContent(shape.data);
                circle.bindPopup(popup);
                drawnItems.addLayer(circle);
            }
            else if(shape.hasOwnProperty("LatLng"))
            {
                var marker = L.marker(shape.LatLng);
                var popup = L.popup();
                popup.setContent(shape.data);
                marker.bindPopup(popup);
                drawnItems.addLayer(marker);
            }
            else if(shape.hasOwnProperty("LatLngs"))
            {
                var polyline = L.polyline(shape.LatLngs);
                var popup = L.popup();
                popup.setContent(shape.data);
                polyline.bindPopup(popup);
                drawnItems.addLayer(polyline);
            }

        }
    }
}
function chooseAddr(lat1, lng1, lat2, lng2, osm_type) {
	var loc1 = new L.LatLng(lat1, lng1);
	var loc2 = new L.LatLng(lat2, lng2);
	var bounds = new L.LatLngBounds(loc1, loc2);

	if (feature) {
		lostMap.removeLayer(feature);
	}
	if (osm_type == "node") {
		feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(lostMap);
		lostMap.fitBounds(bounds);
		lostMap.setZoom(18);
	} else {
		var loc3 = new L.LatLng(lat1, lng2);
		var loc4 = new L.LatLng(lat2, lng1);

		feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(lostMap);
		lostMap.fitBounds(bounds);
	}
}

function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
        });

		$('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found" }).appendTo('#results');
        }
    });
}

/* For hiding and showing the forms hidden in the buttons */
function openBox() {
    $('#foundDiv').slideToggle();
}

window.onload = load_map;
    