var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/www'));

// homepage by event name
app.get('/:event_name', function(req, res){
  var event_name = req.params.event_name;
  res.render('event', {title: event_name});
});

var port = 8080;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions
//

