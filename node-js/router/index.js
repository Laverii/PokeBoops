
//Alok and Kandarp helped us here:
var d = require('../ajax/data.json');

module.exports = function (req, res, callback) {
    callback({data: d});
};