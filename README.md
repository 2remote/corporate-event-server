# Corporate Event Server
为YAOPAI生成企业活动的图片浏览

## 配置
1. 测试时，根目录下创建development.json文件，放入端口号、AccessKey和SecretKey，如：

```
  {
    "PORT": 3000,
    "ACCESS_KEY": "asdfeoifjsoadfjoeifewf",
    "SECRET_KEY": "asdfeoifjsoadfjoeifewf"
  }
```

1. 注意：不要把development.json提交到git。
1. 发布时，在发布环境下放入这三个参数到环境变量。


## 使用
1. 访问活动名称 http://localhost:8080/livepictest4262 会返回所有图片
