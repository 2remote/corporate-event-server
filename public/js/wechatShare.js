$(function(){
  var URL = 'http://api.aiyaopai.com/?api=Order.WeixinJsapiTicket'
  var TITLE = document.title
  var IMG_SRC = document.getElementById('share_img_url').src

  getWechatSignature = function(fn){
    $.ajax({
      url: URL,
      type : 'POST',
      dataType : 'json',
      timeout : 5000,
      crossDomain : true,
      xhrFields:{
        withCredentials : true
      },
      success:function(data) {
        console.log(data)
        if(data.Success) {
          fn(data)
        } else {
          console.log(data)
          console.error('获取微信票据失败')
        }
      },
      error:function(){
        console.error('获取微信票据失败')
      }
    })
  }

  var wechatShare = function(data) {
    var shareData = {
      appId: data.AppId,
      signature: data.Signature,
      title: TITLE,
      desc: TITLE,
      link: location.href,
      imgUrl: IMG_SRC
    };
    $.wechatShare(shareData);
  }

  getWechatSignature(wechatShare)
})
