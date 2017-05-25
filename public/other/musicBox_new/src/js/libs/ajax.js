import {Path} from './common';
import _ from '../plugins/loadsh';

var defData = {appId:11011,type:1,deviceSource:2};

var Ajax;
export default Ajax = {

	// 获取星月灯运行数据
	getData(suc){
		var time = +new Date();
		ajax({
			url:Path.wPath + '/wechat/hotel/device/data/get',
			data:{
				deviceId:gMain.deviceId,
				time:+new Date()
			},
			success(res){
				if (res.code == 103005001) { // 未授权，跳转授权页面
	                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	            }
	            suc(res);
			}
		})
	},

	// 下发播放内置音乐控制数据
	setMusicControl(data, suc, err){
		var sendData={
			controlNumber:2,
			speakerPlayStatus:data.speakerPlayStatus,
			speakerOperate:0,
			speakerMode:0,
			speakerVolume:0xff,
			speakerSoundSource:1
		}

		if(data.musicId) sendData.speakerSoundNumber = data.musicId;

		ajax({
			url:Path.wPath + '/wechat/hotel/device/config/set',
			type:'post',
			data:{
				deviceId:gMain.deviceId,
				source:8,
				json:JSON.stringify(sendData)
			},
			success(res){
				suc(res);
			}
		})
	},

	playMusicControl(data,suc,err){
		data.playStatus = 1;
		setMusicControl(data, suc, err);
	},

	pauseMusicControl(data, suc, err){
		data.playStatus = 2;
		setMusicControl(data, suc, err);
	},

	// 获取自定义专辑
	getCustomAlbums(suc, err){
		var sendData = Object.create(defData);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/getCustomAlbumsList',
			data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res.data);
			}
		});
	},

	// 添加自定义专辑
	buildCustomAlbum(data, suc, err){
		var sendData = Object.create(defData);
		sendData.title = data.title;
		sendData.undefaultPic = false;

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/buildCustomAlbum',
			data:sendData,
			type:'post',
			success(res){
				suc(res);
			}
		});
	},

	// 删除自定义专辑
	deleteCustomAlbum(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/deleteCustomAlbum',
			data:sendData,
			type:'post',
			success(res){
				suc(res);
			}
		});
	},

	// 更新自定义专辑信息
	renewCustomAlbum(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/renewCustomAlbum',
			data:sendData,
			type:'post',
			success(res){
				suc(res);
			}
		});
	},

	// 获取自定义专辑中的歌曲列表
	getMusicsFromCustomAlbum(data, suc, err){
		var sendData = Object.create(defData);
		sendData.albumsCustomId = data.albumsCustomId;
		sendData.paged = false;

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/getMusicsFromCustomAlbum',
			data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res.data.list);
			}
		});
	},

	// 删除自定义专辑中的音乐
	deleteMusicFromCustomAlbum(data, suc, err){
		var sendData = Object.create(defData);
		sendData.musicList = JSON.stringify(data.musicList);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/deleteMusicFromCustomAlbum',
			data:sendData,
			type:'post',
			success(res){
				suc(res);
			}
		});
	},

	// 添加自定义专辑中的音乐
	addMusicsToCustomAlbum(data, suc, err){
		var sendData = Object.create(defData);
		sendData.musicList = JSON.stringify(data.musicList);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/addMusicsToCustomAlbum',
			data:sendData,
			type:'post',
			success(res){
				suc(res);
			}
		});
	},

	// 获取收藏的歌曲
	getCollectList(data, suc, err){
		var sendData = Object.create(defData);
		sendData.paged = false;

		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/getCollectList',
			data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res.data.list);
			}
		});
	},

	// 获取推荐专辑列表
	getRecommAlbums(suc, err){
		ajax({
			url:Path.wPath + '/wechat/hotel/media/albums/getRecommAlbums',
			success(res){
				if(res.code!=0) return;

				suc(res.data);
			}
		});
	},

	// 获取设备内音乐
	getRoomeMusicList(data, suc, err){
		var sendData = _.extend({},defData);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/getRoomeMusicList',
			//data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res.data);
			}
		});
	},

	// 获取本地电台
	getLocalRadio(data, suc, err){
		var sendData = _.extend({},defData);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/getLocalRadio',
			success(res){
				suc(res.data);
			}
		});
	},

	// 根据大类标识获取音乐小类列表
	getSubCategroyList(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/getSubCategroyList',
			data:sendData,
			success(res){
				suc(res);
			}
		});
	},

	// 获取助眠音乐专辑列表
	getXmlyAlbumsList(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/getXmlyAlbumsList',
			data:sendData,
			success(res){
				suc(res);
			}
		});
	},

	// 收藏音乐
	musicCollect(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/music/collect',
			data:sendData,
			success(res){
				suc(res);
			}
		});
	},

	// 获取收藏列表
	getCollect(data, suc, err){
		var sendData = _.extend({},defData);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/music/getCollect',
			//data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res.data);
			}
		});
	},

	// 取消收藏音乐
	unsubscribe(data, suc, err){
		var sendData = _.extend({},defData,data);

		ajax({
			url:Path.wPath + '/wechat/hotel/media/music/unsubscribe',
			data:sendData,
			success(res){
				if(res.code!=0) return;

				suc(res);
			}
		});
	},







	// 喜马拉雅接口
	getXmlyMusicByUrl(url, sdata, suc, err){
		var sendData = _.extend({},defData)
		
		var str = '';
		for(var key in sdata){
			str += key+'='+sdata[key]+'&';
		}
		str = str.substr(0, str.length-1);

		sendData.url = url;
		sendData.data = encodeURIComponent(str);

		//sendData = JSON.stringify(sendData);
		ajax({
			url:Path.wPath + '/wechat/hotel/media/getXmlyMusicByUrl',
			data:sendData,
			type:'post',
			success(res){
				if(res.code!=0) return;

				suc(JSON.parse(res.data));
			}
		});
	},

	// 获取喜马拉雅内容分类
	getXmlyCategoryList(data, suc, err){
		var url = 'http://api.ximalaya.com/categories/list';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},

	// 根据分类 ID 获取标签列表
	getXmlyCategoryTags(data, suc, err){
		var url = 'http://api.ximalaya.com/tags/list';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},

	// 根据分类和标签 ID 获取专辑列表
	getXmlyCategoryAlbums(data, suc, err){
		var url = 'http://api.ximalaya.com/albums/list';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},

	// 根据专辑 ID 获取音乐列表
	getXmlyAlbumMusics(data, suc, err){
		var url = 'http://api.ximalaya.com/albums/browse';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},


	// 获取主播分类
	getXmlyAnnoCateList(data, suc, err){
		var url = 'http://api.ximalaya.com/announcers/categories';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},

	// 获取主播分类下的主播列表
	getXmlyCategoryAnnos(data, suc, err){
		var url = 'http://api.ximalaya.com/announcers/list';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},

	// 获取主播的专辑列表
	getXmlyAnnoAblums(data, suc, err){
		var url = 'http://api.ximalaya.com/albums/by_announcer';
		this.getXmlyMusicByUrl(url, data, suc, err);
	},
}

function createAjax() {
    var xhr = null;
    try {
        //IE系列浏览器
        xhr = new ActiveXObject("microsoft.xmlhttp");
    } catch (e1) {
        try {
            //非IE浏览器
            xhr = new XMLHttpRequest();
        } catch (e2) {
            window.alert("您的浏览器不支持ajax，请更换！");
        }
    }
    return xhr;
};

function ajax(conf) {
    // 初始化
    //type参数,可选
    var type = conf.type;
    //url参数，必填 
    var url = conf.url;
    //data参数可选，只有在post请求时需要
    var data = conf.data;
    //datatype参数可选    
    var dataType = conf.dataType;
    //回调函数可选
    var success = conf.success;

    var error = conf.error;
                                                                                         
    if (type == null){
        //type参数可选，默认为get
        type = "get";
    }
    if (dataType == null){
        //dataType参数可选，默认为text
        dataType = "json";
    }
    if (type == "GET" || type == "get") {
        if(data){
            var str = '?';
            for(var key in data){
                str+=key+'='+data[key]+'&'
            }
            str = str.substr(0,str.length-1);
            url += str;
        }
    }
    // 创建ajax引擎对象
    var xhr = createAjax();
    // 打开
    xhr.open(type, url, true);
    // 发送
    if (type == "GET" || type == "get") {
        xhr.send(null);
    } else if (type == "POST" || type == "post") {
        /*xhr.setRequestHeader("content-type",
                    "application/x-www-form-urlencoded");*/
        var oForm = new FormData();
        for(var key in data){
            oForm.append(key,data[key])
        }
        xhr.send(oForm);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if(dataType == "text"||dataType=="TEXT") {
                if (success != null){
                    //普通文本
                    success(xhr.responseText);
                }
            }else if(dataType=="xml"||dataType=="XML") {
                if (success != null){
                    //接收xml文档    
                    success(xhr.responseXML);
                }  
            }else if(dataType=="json"||dataType=="JSON") {
                if (success != null){
                    //将json字符串转换为js对象  
                    success(JSON.parse(xhr.responseText));
                }
            }
        }
    };
};  

window.ajax = ajax;



