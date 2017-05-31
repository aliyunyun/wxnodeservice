var express = require('express'),
  router = express.Router(),
  wechat = require("wechat"),
  wechatConfig = require("../../config/wechatInfo");

var crypto = require('crypto');
var url = require('url');
var OAuth = require('wechat-oauth');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(wechatConfig.infoList.appid, wechatConfig.infoList.appsecret);

var client = new OAuth(wechatConfig.infoList.appid, wechatConfig.infoList.appsecret);

module.exports = function (app) {
  app.use('/wechat', router);
};


router.get('/jssdk/sign', function(req, res){
    console.log("i get the jssdk sign get");
    res.send("hello jssdk sign");
});

router.post('/jssdk/sign', function(req, res){  
    
console.log("i get the jssdk sign post");
     
console.log("body: " + req.body.url);

    var param = {
        debug:true,
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
                res.send(err);
            }else{
                console.dir("get ticket:" + JSON.stringify(result));
                res.send(result);
            }
    });
});


// router.get('/', function(req, res){
//     checkToke(req, res);    
// });

// router.post('/', function(req, res){

//     console.log("start post !!!" + JSON.stringify(req.body)); 
//     checkToke(req, res);    
// });

 function checkToke(req,res){  

    console.log("start !!!");
    var query = url.parse(req.url,true).query;  
    var signature = query.signature;  
    var timestamp = query.timestamp;  
    var nonce = query.nonce;  
    var echostr = query.echostr;  
    if(check(timestamp,nonce,signature,"abcdefg")){  
        res.end(echostr);  
    }else{  
        res.end("It is not from weixin");  
    }  
};  
  
function check(timestamp,nonce,signature,token){  
    var currSign,tmp;  
    tmp = [token,timestamp,nonce].sort().join("");  
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");  
    return (currSign === signature);    
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
