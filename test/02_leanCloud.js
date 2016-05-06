var test = require('tape');
var AV = require('avoscloud-sdk');

// set leanCloud
var ret = AV.initialize('3mY5tYSIAawgeVjJ9BIrbloU-gzGzoHsz', 'Tq9uT7sbzoByfjNVSfeSCFRc');


test('leanCloud test', function(t) {
  t.ok(AV);

  // insert an event
  var Event = AV.Object.extend('Event');
  var eventQuery= new AV.Query(Event);
  
  eventQuery.select('folderName', 'title');
  eventQuery.find().then(
    function(results) {
      if(results.length > 0 ){
        t.ok(results, 'found events');
        results.forEach(function(result){
          if(result._hasData){
            t.ok(result._serverData, 'found event data'); 
          }
        });
      }else{
        t.equal(results, 'has not data');
      }
    }, function(error) {
      // 失败
      t.ok(false, 'found events failed');
      t.equal(results, 1, 'found events data');
    });
  t.end();
});
