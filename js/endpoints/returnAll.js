var mongoose = require('mongoose');
var SCHEMA = require('../schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

module.exports = function(req, res) {
  Cache.find({},{ '_id': 0, 'key':1},{
    sort:{
        key: 1 //Sort by Key
    }
  }).exec(function (err, result) {
    if (err) return res.send(500, { error: err });
    console.log("Stored Keys:\n"+result);
    res.send(JSON.stringify(result));
  });
}
