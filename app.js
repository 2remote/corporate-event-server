var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');
var conf = require('./cfg');
var qiniu = require('qiniu');
var AV = require('avoscloud-sdk');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

//init qiniu
qiniu.conf.ACCESS_KEY = conf('ACCESS_KEY');
qiniu.conf.SECRET_KEY = conf('SECRET_KEY');

// set leanCloud
AV.initialize(LEANCLOUD_APP_ID, LEANCLOUD_APP_KEY);

var client = new qiniu.rs.Client();
var listPhotos= qiniu.rsf.listPrefix;
var corporatePreLink = "http://" + conf('PRE_URL') + "/";
var bucket = conf('BUCKET');

// get gallery by event name
app.get('/:event', function(req, res){
	var event_name = req.params.event;

  // search an event
  var Event = AV.Object.extend('Event');
  var eventQuery= new AV.Query(Event);
  eventQuery.select('folderName', 'title');
  var eventDescriptions = [];

  // update folder name and title
  eventQuery.find().then(
    function(results) {
      if(results.length > 0 ){
        console.log('found events');
        results.forEach(function(result){
          if(result._hasData){
            // update eventDescriptions 
            eventDescriptions.push(result);
          }
        });
      }else{
        console.log('server no results');
      }
    }, function(error) {
      // 失败
      console.log('found events failed');
    });

	var event_title = {
		strawberry: '2016 北京草莓音乐节高清大图实时直播',
	};
  
  // get title from folderName


	listPhotos(bucket, event_name, false, false, false,  function(err, ret) {
    var images = [];
		if (err) {
     console.error('[ERROR]', err);
    }else{
      console.log('ret', ret);
      ret.items.forEach(function(img){
        images.push(covertImageInfo(img.key, img.hash, img.mimType, img.putTime));
        });
      res.render('event', {title: event_title.strawberry, photos: images});
    }
	});
});

var port = conf('PORT');
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions

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
}


