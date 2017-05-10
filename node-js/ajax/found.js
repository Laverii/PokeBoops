module.exports = {
	foundItem: function(req, res){

		console.log("enter found js");
		require("./data.json").push(req.body);
		console.log(require("./data.json"))
		res.success();
	}
}