$(function() {
  // grab an element
  var myElement = document.querySelector("#footer");
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement, {
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
  // ==============================================

  // 加入每个内容的点击响应
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

  // 关闭低栏按钮点击事件
  $("#close_footer").click(function(e) {
    e.stopPropagation()
    $('#footer').hide()
    return false
  })

  //百度统计代码
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?22b6b1b5d65b126d38e09742b734eba6";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();

  // ==============================================
  // 启动 img lazyload
  $("img.lazy").lazyload();


  //微信分享标题 ==============================================

  //分享链接的缩略图
  var imgUrl = 'http://gw.alicdn.com/tps/i3/TB1V1AsFVXXXXcBXVXXpAOt1VXX-186-186.jpg';
  //分享链接的链接地址
  var lineLink = 'http://m.taohua.com/market/ebook/game-sishu.php';
  //分享链接的描述信息
  var descContent = document.title;
  //分享链接的标题
  var shareTitle = document.title;
  //一般为空 就好
  var appid = '';
  //分享给好友
  function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
      "appid": appid,
      "img_url": imgUrl,
      "img_width": "640",
      "img_height": "640",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function(res) {
      _report('send_msg', res.err_msg);
    })
  }
  //分享到朋友圈
  function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
      "img_url": imgUrl,
      "img_width": "640",
      "img_height": "640",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function(res) {
      _report('timeline', res.err_msg);
    });
  }
  //分享到腾讯微博
  function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
      "content": descContent,
      "url": lineLink,
    }, function(res) {
      _report('weibo', res.err_msg);
    });
  }
  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
      shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
      shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
      shareWeibo();
    });
  }, false);
})
