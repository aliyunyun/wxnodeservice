
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var url = require('url');

module.exports = function (app) {
  app.use('/wxhard', router);
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("wxhard receive ");
    checkToke(req, res);   
});

router.post('/',function(req,res,next){
    console.log("wxhard request:" + JSON.stringify(req.body));
})

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