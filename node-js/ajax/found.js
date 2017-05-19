//Kandarp and Alok helped us here
var fs = require('fs');
var d = require("./data.json");

module.exports = {
	foundItem: function(req, res){

		console.log("enter found js");
		d.push(req.body);
		fs.writeFile('ajax/data.json', JSON.stringify(d));
		console.log(d)
		res.success();
	}
}
