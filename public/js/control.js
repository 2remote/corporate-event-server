$(function() {
  // grab an element
  var myElement = document.querySelector("footer");
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(myElement, {
     "tolerance": 5,
     "offset": 212,
     "classes": {
       "initial": "animated",
       "pinned": "slideInUp",
       "unpinned": "slideOutDown"
      }
  });
  // initialise
  headroom.init();

<!-- 加入每个内容的点击响应 -->
  document.getElementById('links').onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
      link = target.src ? target.parentNode : target,
      options = {
        index: link,
        displayTransition: false,
        closeOnSwipeUpOrDown: false,
        event: event
      },
      links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
  };

  //统计代码
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?22b6b1b5d65b126d38e09742b734eba6";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();

  $(function() {
    $("img.lazy").lazyload();
  });
})
