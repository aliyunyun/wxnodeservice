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
    res.render('index', {
      title: 'Generator-Express MVC'
    });
   // res.sendFile('../../public/img/logo.png')

  // res.render(path.join(__dirname,'index.html'));

});

router.get('/getInfo',function(req,res){

    console.dir("i receive getInfo Request");

    console.log( + __dirname);
  //  res.render('index');

  // res.sendFile(path.join("/Users/yuanyunlong/Documents/node/wxwechat/public",'error.html'));
 res.render('index', {
      title: 'getInfo'
    });

})


router.get('/createMenu',function(req, res){

  console.log("men_config:" + men_config);

  api.createMenu(men_config,function(err, data){
    console.dir(data);
  });

});


