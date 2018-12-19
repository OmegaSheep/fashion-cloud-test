var express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
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

var mongouri = UTILITY.mongoURI();
try {
  console.assert(mongouri != "");
} catch (e) {
  console.log("ERROR - Please specify mongo URI inside of /js/utility.js\n");
};

var db = mongoose.connect(mongouri);
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000));

app.post('/returnone', RETURN_ONE);
app.get('/returnall', RETURN_ALL);
app.post('/upsert', UPSERT);
app.post('/deleteone', DELETE_ONE);
app.get('/deleteall', DELETE_ALL);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/* TESTS - Ideally you would use a real testing framework and not dump everything into your index.js but I'm out of time. . .*/
module.exports = {
  testReturnAll: function testReturnAll() {
    request('http://127.0.0.1:5000/returnall', function (error, response, body) {
      try {
        console.assert(response && response.statusCode == 200);
      } catch (e) {
        console.log("ERROR - /deleteall failed\n");
      };
    });
  },
  testDeleteAll: function testDeleteAll() {
    request('http://127.0.0.1:5000/deleteall', function (error, response, body) {
      try {
        console.assert(response && response.statusCode == 200);
      } catch (e) {
        console.log("ERROR - /returnall failed\n");
      };
    });
  },
  testUpsert: function testUpsert() {
    request.post({url:'http://127.0.0.1:5000/upsert', form: {key:'key1', data:'asd23d'}}, function(error, response, body) {
      try {
        console.assert(response && response.statusCode == 200);
      } catch (e) {
        console.log("ERROR - /upsert failed\n");
      };
    });
  },
  testDeleteOne: function testDeleteOne() {
    request.post({url:'http://127.0.0.1:5000/deleteone', form: {key:'key3'}}, function(error, response, body) {
      try {
        console.assert(response && response.statusCode == 200);
      } catch (e) {
        console.log("ERROR - /delete failed\n", error, response, body);
      };
    });
  },
  testReturnOne: function testReturnOne() {
    request.post({url:'http://127.0.0.1:5000/returnone', form: {key:'key2'}}, function(error, response, body) {
      try {
        console.assert(response && response.statusCode == 200);
      } catch (e) {
        console.log("ERROR - /returnone failed\n");
      };
    });
  }
}
