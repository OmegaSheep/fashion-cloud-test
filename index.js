const express = require('express')
const mongoose = require('mongoose');
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

app.get('/all', RETURN_ALL);
