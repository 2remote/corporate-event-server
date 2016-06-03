# Corporate Event Server
为YAOPAI生成企业活动的图片浏览

## 配置
1. 测试时，根目录下创建development.json文件，放入端口号、AccessKey和SecretKey，如：

```
  {
    "PORT": 8080,
    "ACCESS_KEY": "asdfeoifjsoadfjoeifewf",
    "SECRET_KEY": "asdfeoifjsoadfjoeifewf"
  }
```

1. 注意：不要把development.json提交到git。
1. 发布时，在发布环境下放入这三个参数到环境变量。


## 使用
1. 访问活动名称 http://localhost:8080/livepictest4262 会返回所有图片

## 参考
- [Headroom.js](http://www.bootcss.com/p/headroom.js/) 为页面顶部多留些空间。在不需要页头时将其隐藏。
- [Headroom.js playground](http://www.bootcss.com/p/headroom.js/playroom/) 在此页面可以动态调整 Headroom.js 的参数，并能立即看到效果
- [animate.css](https://daneden.github.io/animate.css/) Just-add-water CSS animations
- [animate.css github](https://github.com/daneden/animate.css)
- [blueimp/Gallery](https://github.com/blueimp/Gallery#initialization) blueimp Gallery is a touch-enabled, responsive and customizable image & video gallery, carousel and lightbox, optimized for both mobile and desktop web browsers.
- [Data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) 在HTML引入base64图片的范例
- [base64-image.de](https://www.base64-image.de) Convert your images to base64