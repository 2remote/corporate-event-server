var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');
var conf = require('./cfg');
var qiniu = require('qiniu');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

//init qiniu
qiniu.conf.ACCESS_KEY = conf('ACCESS_KEY');
qiniu.conf.SECRET_KEY = conf('SECRET_KEY');

var client = new qiniu.rs.Client();
var listPhotos= qiniu.rsf.listPrefix;
var corporatePreLink = 'http://7xtehn.com2.z0.glb.qiniucdn.com/';
var bucket = 'businesssync';

// get gallery by event name
app.get('/:event', function(req, res){
	var event_name = req.params.event;
	listPhotos(bucket, event_name, false, false, false,  function(err, ret) {
    var images = [];
		if (err) {
     console.error('[ERROR]', err);
    }else{
      console.log('ret', ret);
      ret.items.forEach(function(img){
        images.push(covertImageInfo(img.key, img.hash, img.mimType, img.putTime));
        });
      res.render('event', {title: event_name, photos: images});
    }
	});
});

var port = conf('PORT');
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions
//

function covertImageInfo(key, hash, mimType, putTime){
  var org = corporatePreLink + key;
  var bigImage = org + '?imageMogr2/thumbnail/1024x';
  var thumbnail = org + '?imageMogr2/thumbnail/300x';
  var title = key.split('/')[1];
  return { 
    bigImage: bigImage, 
    title: title, 
    thumbnail: thumbnail, 
    alt: key, 
  };
};
