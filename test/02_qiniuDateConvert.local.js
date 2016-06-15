var test = require('tape');
var common = require('../lib/common.js');

var timeValue = 14648595082946600;

test('Qiniu date convert test', function(t) {
  var dateTime = common.qiniuDateConvert(timeValue);
  t.equal(typeof dateTime, 'object', 'an object');
  t.equal(dateTime.toString(), 'Thu Jun 02 2016 17:25:08 GMT+0800 (CST)', 'right string');

  var dateString = common.qiniuDateFormat(dateTime);
  t.equal(typeof dateString, 'string', 'is a stirng');
  t.equal(dateString, '6月2日 17:25:08', 'format is right');

  var oneStepString = common.qiniuDateString(timeValue);
  t.equal(typeof oneStepString, 'string', 'is a stirng');
  t.equal(oneStepString, '6月2日 17:25:08', 'format is right');
  t.end();
});
