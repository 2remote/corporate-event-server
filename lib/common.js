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

// covertImageInfo
// @param {string} key - Filename from Qiniu ( 2016620test/20160618175651-9T4A7897.jpg )
// @param {string} hash - Hash string from Qiniu
// @param {string} minType - MimeType from Qiniu (image/jpeg)
// @param {string} putTime - Upload file time in UNIX format
// @param {string} folderName - Folder name for event
// @param {string} corporatePreLink - Pre link for image
// @param {string} description - Description array from leanCloud ( [{photoName: 'xxx', photoDescription: 'xxxx'}] )
Common.covertImageInfo = function(key, hash, minType, putTime, folderName, corporatePreLink, description) {
  var rexBanner = /banner/i;

  var org = corporatePreLink + key;
  var bigImage = org;
  if(!key.match(rexBanner)){
    bigImage = org + '-m' + folderName;
  }

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

  if(key.match(rexBanner)){
    outputTitle = 'Image';
    timeFormat  = 'Banner';
  }

  var desc = "";
  var fullWidth = "";
  if((typeof description != 'undefined')
    && (description.length > 0)){
    desc = description[0].photoDescription;
    fullWidth = "width: 100%";
    thumbnail = org + '-wh169'
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
    description: desc,
    fullWidth: fullWidth
  };
}

// 给大图重新排序
Common.sortBigImages = function(images) {
  var i = 0;
  var bigImages = [];
  var sortedImges = [];

  // 在 images 中只要遇到大图都扔到 bigImages 里面，并从 images 中删掉此大图，images 只保留小图，方便计算所有小图的3的倍数。
  // 每次循环都将 images 中的小图 copy 到 sortedImges 中，每隔三张小图，把 bigImages 的图全部转移到 sortedImges 中。
  for (i; i < images.length; i++){
    if (images[i].fullWidth){
      bigImages.push(images[i]);
      images.splice(i, 1);
      i--;
    } else {
      if ((i%3 === 0) && (bigImages.length > 0)) {
        sortedImges.push(...bigImages);
        bigImages = [];
      }
      sortedImges.push(images[i]);
    }
  }

  // 最后再把剩下的 bigImages 全 copy 到 sortedImges 尾部。
  if (bigImages.length > 0){
    if (images.length%3 === 0){
      sortedImges.push(...bigImages);
    } else {
      sortedImges.splice(-images.length%3, 0, ...bigImages);
    }
  }

  return sortedImges;
}

module.exports = Common;
