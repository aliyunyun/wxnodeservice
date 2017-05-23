'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

let timer = 0;
const tipsShow = (_this,tips)=>{
	_this.trigger({
		tips:tips,
		toastShow:true
	})
	timer = setTimeout(()=>{
		_this.trigger({
		toastShow:false
	})
	},3000)
};
const DOMAIN = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/beerglass' : // 测试环境
    		   location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/beerglass' : // 预发布环境
   			   '/clife-wechat/wechat/beerglass'; // 正式环境

export const Store = Reflux.createStore({
    listenables: [Actions],
    onBindDdevice(){
    	let data={};
        // wx.scanQRCode({
        //     needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        //     scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        //     success: function (res) {
        //         data.deviceUid  = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        //     }
        // });
        this.onAjax(data,DOMAIN+'/bind');
    }, 
    onShareFriend(url){
    	console.log('share',url);
  //       wx.onMenuShareAppMessage({
		//     title: '', // 分享标题
		//     desc: '', // 分享描述
		//     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		//     imgUrl: '', // 分享图标
		//     type: '', // 分享类型,music、video或link，不填默认为link
		//     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		//     success: function () { 
		//         // 用户确认分享后执行的回调函数
		//     },
		//     cancel: function () { 
		//         // 用户取消分享后执行的回调函数
		//     }
		// });
    },
    onAjax(data,url){
    	var _this = this,
    	wholeUrl = DOMAIN + url;
    	wholeUrl='http://200.200.200.50/v1/web/open/systemNotice/getRollingNotice';
    	data = {pageRows:100,pageIndex:1};
    	het.post(wholeUrl,data,
    		function(result){
                result = JSON.parse(result);
                let  data = result.data?result.data:'';
               /*模拟数据*/
                if(data){
        //     		data = [
				    //     {
				    //         "activityType": 1,
				    //         "lightType": null,
				    //         "winNum": null
				    //     },
				    //     {
				    //         "activityType": 2,
				    //         "lightType": 2,
				    //         "winNum": 1
				    //     },
				    // ];

                	data={
			        "owner": {
			            "groupOwner": "23afdsf",
			            "ownerNickName": "owen",
			            "sex": 1,
			            "headImgUrl": "http://img/sdfsdfdf/1.png"
			        },
			        rankList: [
			            {
			                "userUid":"23afdsf",
			                "nickName":"owen",
			                "sex": 1,
			                "headImgUrl": "http://img/sdfsdfdf/1.png",
			                "drinkCapacity":400         
			            },
			            {
			                "userUid":"24afdsf",
			                "nickName":"gavin",
			                "sex": 1,
			                "headImgUrl": "http://img/sdfsdfdf/2.png",
			                "drinkCapacity":300         
			            }
			        ],
                    "groupId": 1,
                    "groupName": "真心话大冒险一组",
                    "lightType": 2,
                    "groupOwner": 23,
                    "ownerNickName": "owen",
                    "isOwner": true,
                    "groupQRcode": "http://localhost/images/2013/weixin.png",
                    "groupUrl": "http://localhost/group/add"       
			    };
                	// _this.trigger({eventInfo:data});
                	_this.trigger(data);
                }
 				if(url=='/activity/start'){//启动活动
					tipsShow(_this,"活动已启动");
					return;
                }
                if(url=='/activity/get'){//活动详情
                	if(data!=''){
                		_this.trigger({eventInfo:data});
                		return;
                	}
                }
                if(data.groupQRcode){
                    localStorage.setItem('groupId_'+data.groupId,data.groupQRcode);
                }
    		},
    		function(msg){alert(msg);})
    }
});   