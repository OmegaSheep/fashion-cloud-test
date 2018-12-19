var mongoose = require('mongoose');

module.exports = {
  cacheSchema : mongoose.Schema({
      key: {type: String, required: true, unique: true},
      data: {type: String, required: true}
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
}
