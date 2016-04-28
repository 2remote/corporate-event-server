var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');
var conf = require('./cfg');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));


var photos = [
	{
		bigImage: 'images/rice.jpg',
		title: 'rice',
		thumbnail: 'images/thumbnail/rice.jpg',
		alt:'rice'
	},
	{
		bigImage: 'images/nuddles.jpg',
		title: 'nuddles',
		thumbnail: 'images/thumbnail/nuddles.jpg',
		alt:'nuddles'
	},
	{
		bigImage: 'images/mushroom.jpg',
		title: 'mushroom',
		thumbnail: 'images/thumbnail/mushroom.jpg',
		alt:'mushroom'
	},
];

// homepage by event name
app.get('/:event_name', function(req, res){
  var event_name = req.params.event_name;
  res.render('event', {title: event_name, photos: photos});
});

var port = conf('PORT');
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions
//

