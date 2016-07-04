var fs = require('fs');
var path = require('path');

function Common(){};  
Common.getFilePath = function(file) { // ( file -- fullpath )
  var filepath = path.join(process.cwd(), file);
  return filepath;
};

Common.readJSON = function(file) { // ( file -- data )
  var filePath = exports.getFilePath(file);
  var data = JSON.parse(fs.readFileSync(filePath, 'utf8') || []);
  return data;
};

Common.saveJSON = function(data, filename) { // ( data, filename  -- file )
  var filePath = exports.getFilePath(filename);
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', function(err){
    if (err) throw err;
    console.log('Data is saved to file s%', filePath);
  });
};

Common.qiniuDateConvert = function(qiniuTimeValue) { // ( timeValue -- date obj )
  var dateTime = new Date(qiniuTimeValue / 10000); // 需要将七牛时间除以10000，得到合适的时间
  return dateTime;
}

Common.qiniuDateFormat = function(dateObj) { // ( date obj-- 5月30日 18:00:03 )
  var time = dateObj.toLocaleTimeString();
  var month = dateObj.getMonth() + 1;
  var date = dateObj.getDate();
  return month + "月" + date + "日 " + time;
}

Common.qiniuDateString = function(timeValue) { // ( time value -- 5月30日 18:00:03 )
  var dateObj = this.qiniuDateConvert(timeValue); 
  var string = this.qiniuDateFormat(dateObj);
  return string;
}

Common.yaopaiPhotoNameHandle = function(key) { // ( key -- time value.string )
  var timeValue = key.split('.')[0]; 
  var newDateRe = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})-/;
  var newDateResult = false;
  newDateResult = key.match(newDateRe);
  if (key.match(/mmexport/)){
    timeValue = timeValue.split('export')[1];
  }
  if(newDateResult){
    var datetime = new Date(
      newDateResult[1], (newDateResult[2]-1), newDateResult[3], 
      newDateResult[4], newDateResult[5], newDateResult[6] 
    );
    timeValue = datetime.getTime();
  }
 
  timeValue = parseInt(timeValue, 10);
  return timeValue;
}

Common.timeValueCheck= function(filename) { // ( filename -- true/false )
 // console.log(parseInt(filename,10));
  var dateObj = new Date(parseInt(filename, 10));
  // console.log(dateObj.toString());
  return !(dateObj.toString() === 'Invalid Date');
}

Common.covertImageInfo = function(key, hash, minType, putTime, folderName, corporatePreLink) {
  var org = corporatePreLink + key;
  var bigImage = org + '-m' + folderName;
  var thumbnail = org + '-s';
  var title = key.split('/')[1];

  var shotDateString = false ;
  var shotTimeValue  = false ;
  var timeFormat = '上传时间';
  var putDateString = Common.qiniuDateString(putTime);
  if(Common.timeValueCheck(title)){
    shotTimeValue = Common.yaopaiPhotoNameHandle(title);
    shotDateString = Common.qiniuDateFormat(new Date(shotTimeValue));
  } else {
    shotTimeValue = false;
  }

  var outputTitle = "";
  if(shotDateString){
    outputTitle = shotDateString;
    timeFormat = '拍照时间';
  } else {
    outputTitle = putDateString;
  }

  return {
    bigImage: bigImage,
    title: outputTitle,
    timeFormat: timeFormat,
    thumbnail: thumbnail,
    alt: key,
    putDate: putDateString,
    shotTime: shotTimeValue,
    putTime: putTime,
  };
}

module.exports = Common;
