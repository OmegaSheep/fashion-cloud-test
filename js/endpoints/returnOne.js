var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var UTILITY = require('../utility.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  var key = req.body['key'];
  var randomData = UTILITY.randomData("");
  Cache.findOne({"key":key}).exec(function (err, result) {
    if (err) return res.send(500, { error: err });
    if (result !== null) {
      console.log("Cache Hit: "+result['data']);
      res.send("Cache Hit: "+result['data']);
    } else {
      Cache.create({
        key: key,
        data: randomData
      }, function(err, result){
        if (err) return res.send(500, { error: err });
        console.log("Cache Miss: "+randomData);
        res.send("Cache Miss: "+randomData);
      });
    }
  });
}
