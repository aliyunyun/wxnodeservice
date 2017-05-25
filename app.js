

var express = require('express'),
  config = require('./config/config');

var app = express();

//设置跨域访问
app.all('/wechat/*', function(req, res, next) {

    console.log("receive wechat ");

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.all('*', function(req, res, next){
     // Disable caching for content files
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
})

module.exports = require('./config/express')(app, config);


app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

