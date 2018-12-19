var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var UTILITY = require('../utility.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

const MAX_AMOUNT = UTILITY.itemLimit();
module.exports = function(req, res) {
  var key = req.body['key'];
  var data = req.body['data'];

  Cache.find({}, ["key", "data", "updated_at"], { sort: '-updated_at' }).exec(function (err, result) {
    if (err) return res.status(500).send(err);

    // Find Match
    var match = null;
    for (var i in result) {
      if (result[i]['key'] == key) {
        match = result[i];
      }
    }
    if (match) {
        match['data'] = data;
        match.save();
        console.log("Updated: "+data);
        res.send("Updated: "+data);
    } else {
      // Remove Oldest Item if needed.
      if (result.length >= MAX_AMOUNT) {
        result.pop().remove();
      }
      Cache.create({
        key: key,
        data: data
      }, function(err, result){
        if (err) return res.status(500).send(err);
        console.log("Inserted: "+data);
        res.send("Inserted: "+data);
      });
    }
  });
}
