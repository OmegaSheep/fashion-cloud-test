var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  var key = req.body['key'];
  var data = req.body['data'];
  Cache.findOneAndUpdate({"key":key},{"key": key, "data": data}, {upsert: true}).exec(function (err, result) {
    if (err) return res.send(500, { error: err });
    console.log("Upserted Succesfully:\nKey: "+key+"\nData: "+data);
    res.send("Upserted Succesfully:\nKey: "+key+"\nData: "+data);
  });
}
