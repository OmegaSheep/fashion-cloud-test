var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  var key = req.body['key'];
  Cache.findOneAndRemove({"key":key},{ '_id': 0, 'key':1}).exec(function (err, result) {
    if (err) return res.status(500).send(err);
    if (result !== null) {
      console.log("Deleted Key: "+result['key']);
      res.send("Deleted Key: "+result['key']);
    } else {
      console.log("Could not find key: "+key.toString());
      res.send("Could not find key: "+key.toString());
    }
  });
}
