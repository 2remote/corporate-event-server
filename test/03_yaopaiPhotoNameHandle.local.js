var test = require('tape');
var common = require('../lib/common.js');

var mmexportKey = 'mmexport1464827976760.jpg';
var normalKey = '1464827976760.jpg';
var newDateKey= '20160618175714-9T4A7899.jpg';

test('YAOPAI photo name handle', function(t) {
  var dateTime = common.yaopaiPhotoNameHandle(normalKey);
  t.equal(typeof dateTime, 'number', 'a stirng');
  t.equal(dateTime, 1464827976760, 'right number');

  dateTime = common.yaopaiPhotoNameHandle(mmexportKey);
  t.equal(typeof dateTime, 'number', 'a stirng');
  t.equal(dateTime, 1464827976760, 'right number');

  dateTime = common.yaopaiPhotoNameHandle(newDateKey);
  t.equal(typeof dateTime, 'number', 'a stirng');
  t.equal(dateTime, 1466243834000, 'right number');

  t.end();
});
