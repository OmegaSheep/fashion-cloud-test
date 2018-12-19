var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
const path = require('path')
const PORT = process.env.PORT || 5000

var UTILITY = require('./js/utility.js');
var SCHEMA = require('./js/schema.js');

var RETURN_ALL = require('./js/endpoints/returnAll.js');
var RETURN_ONE = require('./js/endpoints/returnOne.js');
var UPSERT = require('./js/endpoints/upsert.js');
var DELETE_ONE = require('./js/endpoints/deleteOne.js');
var DELETE_ALL = require('./js/endpoints/deleteAll.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

var mongouri = "mongodb://fashion:cloudy1@ds145083.mlab.com:45083/fashioncloud";
var db = mongoose.connect(mongouri);
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000));

app.get('/returnall', RETURN_ALL);
app.post('/returnone', RETURN_ONE);
app.post('/upsert', UPSERT);
app.post('/delete', DELETE_ONE);
app.get('/deleteall', DELETE_ALL);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
