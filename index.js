var express = require('express')
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const path = require('path')
const PORT = process.env.PORT || 5000

var UTILITY = require('./js/utility.js');
var SCHEMA = require('./js/schema.js');
var RETURN_ALL = require('./js/endpoints/returnAll.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

/* I defined the Mongo Connection URI in a Heroku environment variable for my own testing.
Replace this as you need. */
var mongouri = process.env.MONGOLAB_URI;
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Load home page.
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/all', RETURN_ALL);
