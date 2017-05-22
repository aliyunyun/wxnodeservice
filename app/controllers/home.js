var express = require('express'),
  router = express.Router(),
  Article = require('../models/article'),
  wechatConfig = require("../../config/wechatInfo");


var men_config = require('../../config/wxmenu.json');

var WechatAPI = require('wechat-api');
var api = new WechatAPI(wechatConfig.infoList.appid, wechatConfig.infoList.appsecret);

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});

router.get('/createMenu',function(req, res){

  console.log("men_config:" + men_config);

  api.createMenu(men_config,function(err, data){
    console.dir(data);
  });
  
});
