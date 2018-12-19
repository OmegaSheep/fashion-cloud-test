var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  Cache.find({},{ '_id': 0, 'key':1},{
    sort: '-updated_at'
  }).exec(function (err, result) {
    if (err) return res.status(500).send(err);
    console.log("Stored Keys:\n"+result);
    res.status(200).send(JSON.stringify(result));
  });
}
