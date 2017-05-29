//Kandarp and Alok helped us here
var fs = require('fs');
var d = require("./foundData.json");

module.exports = {
	foundItem: function(req, res){

		console.log("enter found js");
		d.push(req.body);
		fs.writeFile('ajax/foundData.json', JSON.stringify(d));
		console.log(d)
		res.success();
	},

	getFoundItem: function(req, res){
		res.send(d);

		//Chen suggestested to move it
		function submitFoundMap(evt){
        // evt.preventDefault();
        alert("Map Post Found Submit!");
        $.ajax({
            url: "/ajax/found?action=getFoundItem",
            type: "post",
            data: {
                item_name: $("#item_name_Map").val(),
                description: $("#description_Map").val(),
                full_name: $("#full_name_Map").val(),
                phone_number: $("#phone_number_Map").val(),
                email: $("#email_Map").val()
                },
            success: function(data)
            {
                alert("Post saved on map.");
                //location.reload();
            }
        });

        return false;
    }
    	//Advice from Chen:
		//move postFOund function into here and dd /ajax/found?action=getFoundItem
		//Find how to render it onto the map afterwards
		//For loop through each item on the form.
		//url: "/ajax/found?action=foundItem",

		//alok and kandarp helped here

	function storeData(obj){
    console.log(obj)
	}

	/*storeFoundShapes: function(req, res){
		res.send(d);
	  	$.ajax({
        	url: "/ajax/found?action=storeFoundShapes",
        	type: "post",
        	data:{
        		type: $("type").val(),
        		lat: $("lat").val(),
        		lng: $("lng").val(),
        		bounds: $("bounds").val(),
            	radus: $("radius").val()
        	},
        		success: function(data)
        		{
        			alert("I saved the shape values!");
        		}
    	})
	}*/
}


}