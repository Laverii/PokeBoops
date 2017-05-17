module.exports = {
	lostItem: function(req, res){
		console.log("enter lost js");
		require("./data.json").push(req.body);
		console.log(require("./data.json"));
		res.success();
	}
}