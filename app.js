var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');
var conf = require('./cfg');
var qiniu = require('qiniu');
var AV = require('avoscloud-sdk');
var arraySort = require('array-sort');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

//init qiniu
qiniu.conf.ACCESS_KEY = conf('ACCESS_KEY');
qiniu.conf.SECRET_KEY = conf('SECRET_KEY');

// set leanCloud
AV.initialize(conf('LEANCLOUD_APP_ID'), conf('LEANCLOUD_APP_KEY'));
var defaultEventDescription= {
  folderName: 'default',
  title: '北京邀拍企业活动页',
};

var client = new qiniu.rs.Client();
var listPhotos= qiniu.rsf.listPrefix;
var corporatePreLink = "http://" + conf('PRE_URL') + "/";
var bucket = conf('BUCKET');

// get gallery by event name
app.get('/:event', function(req, res){
	var event_name = req.params.event;

  var folderName = event_name;

  async.waterfall([
    async.apply(loadEventDescriptions),               // ( -- eventDescripts )
    async.apply(getTitleByFolderName,folderName),     // ( folderName, eventDescriptions -- eventDescription )
    async.apply(getImageAndRenderHtml, folderName ),  // ( folderName, eventDescription -- 'eventDescription )
    async.apply(renderToHtml, res)                  // ( tempName, eventDescription -- render html )
  ]);
});

var port = conf('PORT');
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions

function covertImageInfo(key, hash, mimType, putTime){
  var org = corporatePreLink + key;
  var bigImage = org + '-m';
  var thumbnail = org + '-s';
  var title = key.split('/')[1];
  return {
    bigImage: bigImage,
    title: title,
    thumbnail: thumbnail,
    alt: key,
    putTime: putTime,
  };
}

function loadEventDescriptions(callback){
  console.log('------------------------------------');
  console.log('Step 1: update folder name and title');
  console.log('------------------------------------');
  // search an event
  var Event = AV.Object.extend('Event');
  var eventQuery= new AV.Query(Event);
  eventQuery.select('folderName', 'title', 'wxKeyword');
  var eventDescriptions = [];

  eventQuery.find().then(
    function(results) {
      if(results.length > 0 ){
        console.log('found events');
        results.forEach(function(result){
          if(result._hasData){
            // update eventDescriptions
            eventDescriptions.push(result._serverData);
          }
        });
      }else{
        console.log('server no results');
      }
      callback(null, eventDescriptions);
    }, function(error) {
      // 失败
      console.log('found events failed');
    });
}

function getTitleByFolderName(folderName, eventDescriptions, callback){
  console.log('---------------------------------');
  console.log('Step 2: get title from folderName');
  console.log('---------------------------------');
  console.log('getTitleByFolderName:eventDescriptions', eventDescriptions);
  var currentEventDescription = false ;
  eventDescriptions.forEach(function(eventDescription){
    if ( eventDescription.folderName == folderName){
      currentEventDescription = eventDescription;
    }
  });
  if( currentEventDescription ){
    callback(null, currentEventDescription);
  }else{
    callback(null, defaultEventDescription);
  }
}

function getImageAndRenderHtml(folderName, eventDescription, callback){
  console.log('------------------');
  console.log('Step 3: get images');
  console.log('------------------');
	listPhotos(bucket, folderName, false, false, false,  function(err, ret) {
    var images = [];
		if (err) {
     console.error('[ERROR]', err);
    }else{
      console.log('ret', ret);
      ret.items.forEach(function(img){
        images.push(covertImageInfo(img.key, img.hash, img.mimType, img.putTime));
      });
      arraySort(images, 'putTime', {reverse: true});
      eventDescription.photos = images;
    }
    console.log(eventDescription);
    callback(null, eventDescription);
	});
}

function renderToHtml(res, eventDescription, callback){
  console.log('----------------------');
  console.log('Step 4: render to html');
  console.log('----------------------');
  // console.log('  eventDescription.title', eventDescription.title);
  // console.log('  eventDescription.folderName', eventDescription.folderName);
  // console.log('  eventDescription.wxKeyword', eventDescription.wxKeyword);
  res.render('event', eventDescription);
  callback(null, {});
}
