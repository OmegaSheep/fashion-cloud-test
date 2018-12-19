var mongoose = require('mongoose');

module.exports = {
  cacheSchema : mongoose.Schema({
      key: {type: String, required: true, unique: true},
      data: {type: Array, required: true}
  })
}
