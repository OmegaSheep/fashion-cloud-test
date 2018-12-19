var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  Cache.remove({}, function(err) {
  if (err) return res.send(500, { error: err });
   console.log("All caches emptied.");
   res.send("All caches emptied.");
  });
}
