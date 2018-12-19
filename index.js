const express = require('express')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const path = require('path')
const PORT = process.env.PORT || 5000

var SCHEMA = require('./js/schema.js');
var Cache = mongoose.model('Cache', SCHEMA.cacheSchema);

/* I defined the Mongo Connection URI in a Heroku environment variable for my own testing.
Replace this as you need. */
var mongouri = process.env.MONGOLAB_URI;
var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
