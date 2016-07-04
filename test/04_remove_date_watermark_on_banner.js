var test = require('tape');
var common = require('../lib/common.js');

var filenames = [
  '2016620test/20201220122020-banner.png',
  '2016620test/20201220122020-banner-sdfase.png',
  '2016620test/banner.png',
];

var badFilename = '2016620test/20201220122020.png';
test('found banner inside filename', function(t) {
  var rexBanner = /banner/i;
  filenames.forEach(function(filename) {
    t.ok(filename.match(rexBanner), 'found banner');
  });
  t.notOk(badFilename.match(rexBanner), 'do not found banner');
  t.end();
});

test('format', function(t) {
  var sourceObj = [filenames[0], 'Ft8djAzHxRgwOK6xano0CBklBDp5', 'image/jpeg', 14663939041780276, '2016620test'];
  var targetObj = {
    alt: '2016620test/20201220122020-banner.png',
    bigImage: 'undefined2016620test/20201220122020-banner.png-m2016620test',
    putDate: '6月20日 11:38:24',
    putTime: 14663939041780276,
    shotTime: 1608438020000,
    thumbnail: 'undefined2016620test/20201220122020-banner.png-s',
    timeFormat: '拍照时间',
    title: '12月20日 12:20:20'
  };
  t.deepEqual(common.covertImageInfo(...sourceObj), targetObj, 'show shot time when filename contains right shot time format');

  var badShotTimeFilename = '2016620test/fox-love-all.png';
  var sourceObjBad = [badShotTimeFilename, 'Ft8djAzHxRgwOK6xano0CBklBDp5', 'image/jpeg', 14663939041780276, '2016620test'];
  targetObj = {
    alt: '2016620test/fox-love-all.png',
    bigImage: 'undefined2016620test/fox-love-all.png-m2016620test',
    putDate: '6月20日 11:38:24',
    putTime: 14663939041780276,
    shotTime: false,
    thumbnail: 'undefined2016620test/fox-love-all.png-s',
    timeFormat: '上传时间',
    title: '6月20日 11:38:24'
  };
  t.deepEqual(common.covertImageInfo(...sourceObjBad), targetObj, 'show put time when filename contains wrong shot time format');

  t.end();
});
