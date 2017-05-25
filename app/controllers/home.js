var express = require('express'),
  router = express.Router(),
  Article = require('../models/article'),
  path = require('path'),
  wechatConfig = require("../../config/wechatInfo");


var men_config = require('../../config/wxmenu.json');

var WechatAPI = require('wechat-api');
var api = new WechatAPI(wechatConfig.infoList.appid, wechatConfig.infoList.appsecret);



var rootPath = "";

module.exports = function (app) {
  rootPath = app.locals.rootPath;
  app.use('/', router);

  
};

router.get('/', function (req, res, next) {
  // var articles = [new Article(), new Article()];

    console.log("收到根目录");
    res.render('index');


   // res.render("hello");
   // res.sendFile('../../public/img/logo.png')

  // res.render(path.join(__dirname,'index.html'));

});

router.get('/getInfo',function(req,res){

    console.dir("i receive getInfo Request");

    console.log( + __dirname);
  //  res.render('index');

  // res.sendFile(path.join("/Users/yuanyunlong/Documents/node/wxwechat/public",'error.html'));
 res.render('index');

})




router.get('/createMenu',function(req, res){

  console.log("men_config:" + men_config);

  api.createMenu(men_config,function(err, data){
    console.dir(data);
  });

});

router.post('/jssdk/sign', function(req, res){  
    console.log("i get the jssdk sign post");
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
                     'onWXDeviceBluetoothStateChange',
                     'chooseImage',
                     'checkJsApi',
                            
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

