//Alok and Kandarp helped us here 5/19/17
//What this does is that it needs to get the data sent to the data array in the ajax.
var dataArray = require('../ajax/data.json');

//By calling callback, it calls the information from the data to be used later.
module.exports = function(req,res,callback)
{
	callback({data: dataArray});

};