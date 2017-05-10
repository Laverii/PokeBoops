module.exports = {
	get: function(req, res)
	{
		res.success(require("./data.json"));
	}
}