var express = require('express'),
  router = express.Router(),
  wechat = require("wechat"),
  wechatConfig = require("../../config/wechatInfo");
 

module.exports = function (app) {
  app.use('/wechat', router);
};

router.get('/',    wechat(wechatConfig.infoList,wechat.text(function(message, req, res,next){
        console.log("start !!!");
        
        console.dir(message);
        res.reply();
 })));

 router.post('/',    wechat(wechatConfig.infoList,wechat.text(function(message, req, res,next){
        console.log("post start !!!");
        console.dir(message);
        // res.reply("我知道了");

        res.reply([
            {
                "title":"欢饮您来访问",
                "description":"这个是YY的第一个调通了这个公众号的测试，。。。。。，这个是YY的第一个调通了这个公众号的测试，。。。。。，这个是YY的第一个调通了这个公众号的测试，。。。。。，",
                "picurl":"http://www.rmzxb.com.cn/images/2017zt/20170514ydyl/bannner-0510.jpg",
                "url":"http://www.baidu.com"
            }
        ])
    }).image(function(message, req, res, next){
            console.dir("这个是图片");
            console.dir(message);

            res.reply("我接受到图片了");
    }).location(function(message,req, res, next){
         console.dir("这个是位置信息");
            console.dir(message);

            res.reply("我接收到位置信息了");
    })
 
 
 ));
