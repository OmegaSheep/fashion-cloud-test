var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  Cache.find({},['key', 'data'],{
    sort:{
        key: 1 //Sort by Key
    }
  }).exec(function (err, result) {
    console.log("Results: "+result);
    return result;
  });
}
