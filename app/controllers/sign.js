var express = require('express'),
  router = express.Router(),
  wechat = require("wechat"),
  wechatConfig = require("../../config/wechatInfo");

var WechatAPI = require('wechat-api');
var api = new WechatAPI(wechatConfig.infoList.appid, wechatConfig.infoList.appsecret);



module.exports = function (app) {
  app.use('/wechat', router);
};

router.post('/jssdk/sign', function(req, res){  
    console.log("i get the jssdk sign");
   	// api.getTicket(function(err, result){
    //         if(err){
    //             console.log("get ticket error");
    //         }else{
    //             console.dir("get ticket:" + JSON.stringify(result));
                
    //             res.send(JSON.stringify(result));
    //         }
    //    });


    var param = {
        debug:false,
        jsApiList:[  'openWXDeviceLib',
                     'onMenuShareAppMessage',
                     'getWXDeviceInfos',
                     'sendDataToWXDevice',
                     'startScanWXDevice',
                     'stopScanWXDevice',
                     'connectWXDevice',
                     'disconnectWXDevice',
                     'getWXDeviceTicket',
                     'onWXDeviceBindStateChange',
                     'onWXDeviceStateChange',
                     'onReceiveDataFromWXDevice',
                     'onScanWXDeviceResult',
                     'onWXDeviceBluetoothStateChange'
                            
                            ],
        url:req.body.url
    };
    api.getJsConfig(param, function(err, result){
                 if(err){
                console.log("get ticket error");
            }else{
                console.dir("get ticket:" + JSON.stringify(result));
                
                res.send(result);
            }
    });
});

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
