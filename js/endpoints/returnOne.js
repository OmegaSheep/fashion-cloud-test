var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var UTILITY = require('../utility.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

const TTL = UTILITY.TTL(); // Specify time to live in millseconds. Could put this in an environment variable somewhere.
const MAX_AMOUNT = UTILITY.itemLimit();

module.exports = function(req, res) {
  var key = req.body['key'];
  var randomData = UTILITY.randomData();

  Cache.find({}, ["key", "data", "updated_at"], { sort: '-updated_at' }).exec(function (err, result) {
    if (err) return res.status(500).send(err);
    // No items yet. It's a miss!
    if (result.length == 0) {
        Cache.create({
          key: key,
          data: randomData
        }, function(err, result){
          if (err) return res.status(500).send(err);
          console.log("Cache Miss: "+key+"/"+randomData);
          res.status(200).send("Cache Miss: "+key+"/"+randomData);
        });
    } else {

      // Find Match
      var match = null;
      for (var i in result) {
        if (result[i]['key'] == key) {
          match = result[i];
        }
      }
      if (match) {
        var cacheUpdateTime = match['updated_at'];
        var now = new Date();
        var serverDatetime = now.toISOString();

        var serverSeconds = Date.parse(serverDatetime);
        var cacheSeconds = Date.parse(cacheUpdateTime);

        // TTL Exceeded - It's a miss!
        if ((serverSeconds - cacheSeconds) > TTL) {
          match['data'] = randomData;
          match.save();
          console.log("Cache Miss (TTL): "+key+"/"+randomData);
          res.status(200).send("Cache Miss (TTL): "+key+"/"+randomData);

        // TTL Still valid - It's a hit!
        } else {
          console.log("Cache Hit: "+key+"/"+match['data']);
          res.status(200).send("Cache Hit: "+key+"/"+match['data']);
        }

      // Not Found - It's a miss!
      } else {
        // Remove Oldest Item if needed.
        if (result.length >= MAX_AMOUNT) {
          result.pop().remove();
        }
        Cache.create({
          key: key,
          data: randomData
        }, function(err, result){
          if (err) return res.status(500).send(err);
          console.log("Cache Miss: "+key+"/"+randomData);
          res.status(200).send("Cache Miss: "+key+"/"+randomData);
        });
      }
    }
  });
}
