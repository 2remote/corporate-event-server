var fs = require('fs');
var path = require('path');

exports.getFilePath = function(file) { // ( file -- fullpath )
  var filepath = path.join(process.cwd(), file);
  return filepath;
};

exports.readJSON = function(file) { // ( file -- data )
  var filePath = exports.getFilePath(file);
  var data = JSON.parse(fs.readFileSync(filePath, 'utf8') || []);
  return data;
};

exports.saveJSON = function(data, filename) { // ( data, filename  -- file )
  var filePath = exports.getFilePath(filename);
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', function(err){
    if (err) throw err;
    console.log('Data is saved to file s%', filePath);
  });
};

exports.qiniuDateConvert = function(qiniuTimeValue) { // ( timeValue -- date obj )
  var dateTime = new Date(qiniuTimeValue / 10000); // 需要将七牛时间除以10000，得到合适的时间
  return dateTime;
}

exports.qiniuDateFormat = function(dateObj) { // ( date obj-- 5月30日 18:00:03 )
  var time = dateObj.toLocaleTimeString();
  var month = dateObj.getMonth() + 1;
  var date = dateObj.getDate();
  return month + "月" + date + "日 " + time;
}

exports.qiniuDateString = function(timeValue) { // ( time value -- 5月30日 18:00:03 )
  var dateObj = this.qiniuDateConvert(timeValue); 
  var string = this.qiniuDateFormat(dateObj);
  return string;
}

exports.yaopaiPhotoNameHandle = function(key) { // ( key -- time value.string )
  var timeValue = key.split('.')[0]; 
  if (key.match(/mmexport/)){
    timeValue = timeValue.split('export')[1];
  }
 
  timeValue = parseInt(timeValue, 10);
  return timeValue;
}

exports.timeValueCheck= function(timeValue) { // ( time value -- true/false )
  var dateObj = new Date(parseInt(timeValue, 10));
  console.log(dateObj.toString());
  return !(dateObj.toString() === 'Invalid Date');
}

