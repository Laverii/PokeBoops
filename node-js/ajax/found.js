//Kandarp and Alok helped us here.
var foundDescription = require('foundDescription')
var requiredData = require("./data.json");

module.exports = {
	foundItem: function(req, res){

		console.log("enter found js");
		requiredData.push(req.body);
		foundDescription.writeFile('ajax/data.json', JSON.stringify(requiredData));
		console.log(requiredData)
		res.success();
	}
}