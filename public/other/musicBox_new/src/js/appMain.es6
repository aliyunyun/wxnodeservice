import {Path} from './libs/common';
import RouterDom from './router';
import {Funs} from '../../../common/src/fun.es6';


window.addEventListener('load', function(){
    ReactDOM.render(RouterDom, document.getElementById('ROOT'));
})

// 禁止滑动事件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

window.gMain = {
    deviceId: '960C580F8842D31AB51E7652306E8856'//Funs.getUrlParam('deviceId')
}


/*
    测试专用，手动种植wechatUserId和token
*/
//setCookie();
function setCookie(){
    function setCookie(c_name,value,expiredays,path) {
        var exdate=new Date();
        exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
        document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
    };
    var getCookie = function(name) {
       var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
       if (arr = document.cookie.match(reg)) {
           return unescape(arr[2]);
       } else {
           return null;
       }
   };

    function getQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    };

    var routerFirst =  Path.wPath;
    var _this=this;

     //微信授权
     var hasCookie = function(name) {
        var wechatId = getCookie(name);
        if (wechatId == "" || wechatId == null || wechatId == undefined) {
            //console.log('-------------请求id--')
            //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
            var url =  routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
            //console.log(url)
            window.location.href = url;
        }else{
            //console.log('设置WeChatUserId成功');
            ajax({
                url: Path.wPath+'/wechat/hotel/getToken',
                dataType: 'json',
                // cache:true,
                // async:false,
                success: function(r){
                    if(r.code==0){
                            var access = r.data;
                            setCookie('accessToken',access,0.5,'/');
                        } 
                    }
            });
        }
    };
    setCookie('wechatUserId',10328,0.5,'/');
    hasCookie('wechatUserId');
};

    
