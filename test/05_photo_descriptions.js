var test = require('tape');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var common = require('../lib/common.js');


test('check photo description', function(t) {
  t.ok(true, 'init');
  var sourceObj = ['2016620test/20201220122020-fox.png', 'Ft8djAzHxRgwOK6xano0CBklBDp5', 'image/jpeg', 14663939041780276, '2016620test', 'http://test.com/', [{
    photoName: '2016620test/20201220122020-fox.png',
    photoDescription: '测试用的描述文字。'
  }]];
  var targetObj = {
    alt: '2016620test/20201220122020-fox.png',
    bigImage: 'http://test.com/2016620test/20201220122020-fox.png-m2016620test',
    description: '测试用的描述文字。',
    fullWidth: 'width: 100%',
    putDate: '6月20日 11:38:24',
    putTime: 14663939041780276,
    shotTime: 1608438020000,
    thumbnail: 'http://test.com/2016620test/20201220122020-fox.png-wh169',
    timeFormat: '拍照时间',
    title: '12月20日 12:20:20'
  };
  t.deepEqual(common.covertImageInfo(...sourceObj), targetObj, 'with right description');

  var sourceObjNormal= ['2016620test/20201220122020-fox.png', 'Ft8djAzHxRgwOK6xano0CBklBDp5', 'image/jpeg', 14663939041780276, '2016620test', 'http://test.com/']; 
  var targetObjNormal = {
    alt: '2016620test/20201220122020-fox.png',
    bigImage: 'http://test.com/2016620test/20201220122020-fox.png-m2016620test',
    description: '',
    fullWidth: '',
    putDate: '6月20日 11:38:24',
    putTime: 14663939041780276,
    shotTime: 1608438020000,
    thumbnail: 'http://test.com/2016620test/20201220122020-fox.png-s',
    timeFormat: '拍照时间',
    title: '12月20日 12:20:20'
  };
  t.deepEqual(common.covertImageInfo(...sourceObjNormal), targetObjNormal, 'with no description');

  t.end();
});
