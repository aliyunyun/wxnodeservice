'use strict';

import {Actions} from '../actions/action';
import Ajax from '../libs/ajax';

/*
	获取本地存储信息
*/
function getLocalStorage(name){
	if(name=='list'||name=='records')
		return JSON.parse(localStorage[name]||'[]');
	if(name=='panel')
		return JSON.parse(localStorage[name]||'{}');
	return localStorage[name];
}


/*
	设置本地存储信息
*/
function setLocalStorage(name, data){
	if(name=='list'||name=='records'||name=='panel')
		data = JSON.stringify(data);
	localStorage[name] = data;
}


// 是否显示蓝牙配对提示
export var blueToothTip = {};
;(function(){
	blueToothTip.isHide = getLocalStorage('hideBTTip')=='1';

	blueToothTip.hide = function(){
		setLocalStorage('hideBTTip', 1);
	}
}())

// 播放列表信息
var data = {};
;(function(){
	/*
		当前播放音乐的ID
	*/
	data.currId = getLocalStorage('currId') || 0;


	/*
		播放模式
		0：顺序播放  1：随机播放  2：单曲循环
	*/
	data.mode = getLocalStorage('mode') || 0;

	
	/*
		播放列表音乐信息
			mid, name, uri, msi, mmi, artist
	*/
	data.list = getLocalStorage('list') || [];
}());

// 播放记录
export var Records = {};
;(function(){

	/*
		存储播放记录的最大数
	*/
	Records.maxSize = 100;

	/*
		存储记录有效时间
			7天
	*/
	Records.limitTime = 7*24*3600;

	/*
		记录列表
			mid, name, uri, msi, mmi, artist
	*/
	Records.list = getLocalStorage('records') || [];


	// 获取记录列表
	Records.getList = function(){
		return this.list;
	}

	// 添加记录
	Records.add = function(item){
		this.list.push(item);
		setLocalStorage('records', this.list);
	}

	// 删除记录
	Records.remove = function(items){
		// Object.prototype.toString.call(items) === '[object Array]';
		var list = this.list;

		items.forEach((item)=>{
			for(var i = 0; i < list.length;){
				if(list[i].mid==item.mid) {
					list.splice(i, 1);
				}else{
					i++;
				}
			}
		})

		setLocalStorage('records', list);
	}
}());

/*
	存储标签栏id，当通过回退键直接访问页面时，直接定位到
	存储的panel, 通过链接访问页面时应设置为默认的第一个panel。
	(不采用url存储，这样会造成回退时panel之间来回切换问题)
	有panel的页面：interval、localStation、network、tags
*/
export var Panel = {};
;(function(){

	Panel.data = getLocalStorage('panel') || {};

	/*
		获取name页面的panelId
	*/
	Panel.getId = function(name){
		return this.data[name] || 0;
	}

	/*
		设置name页面panel的id,
		id为0表示索引位置第一个
	*/
	Panel.setId = function(name, id){
		this.data[name] = id || 0;
		setLocalStorage('panel', this.data);
	}
}());

/*
	收藏信息
*/
export var Collects = {};
;(function(){
	Ajax.getCollectList({}, (list)=>{

		Collects.list = list.map((s)=>{
			return{
				mid:s.music_id,
				name:s.name,
				artist:s.artist,
				uri:s.uri,
				sourceType:s.sourceType
			}
		})
	});

	Collects.has = function(item){
		for(var i = 0; i < this.list.length; i++){
			if(item.mid==this.list[i].mid)
				return true;
		}
		return false;
	}

	Collects.add = function(items){
		var arr = [];
		arr = arr.concat(items);
		arr.forEach((item)=>{
			if(!this.has(item))
				this.list.push(item);
		})
	}

	Collects.remove = function(items){
		var list = this.list;

		var arr = [];
		arr = arr.concat(items);

		arr.forEach((item)=>{
			for(var i = 0; i < list.length;){
				if(list[i].mid==item.mid) {
					list.splice(i, 1);
				}else{
					i++;
				}
			}
		})
	}
}());

/*
	内置音乐
*/
export var Internal = {};
;(function(Ajax){

	Ajax.getRoomeMusicList({}, (data)=>{
		Internal.data = data;

	});

	// 获取内置音乐
	Internal.getData = function(callback){
		return this.data;
	}

	// 根据id获取
	Internal.getItem = function(id){
		var i = j = 0;
		for(; i < this.data.length; i++){
			var item = this.data[i];
			for(; j < item.roomeMusicList.length; j++){
				var music = item.roomeMusicList[j];
				if(music.id==id) return music;
			}
		}
		return null;
	}
}(Ajax));


export const locStgStore = Reflux.createStore({

	listenables:[Actions],

	init(){
		var self = this;
		if(!data.currId&&data.list.length)
			data.currId = data.list[0].mid;
	},

	onGetDeviceData(){
		Ajax.getData((res)=>{
			var data = dataFilter(res.data);

			var item = {
				msi:null,
				name:data.speakerSoundName,
				artist:data.speakerSoundAlbums,
			}

			// 设备传来的音乐为播放状态
			// 显示设备内音乐、暂停本地音乐
			if(data.speakerPlayStatus==1){
				this.playInternalMusic();
				this.trigger({currInfo:item, playing:true})

			// 设备传来的音乐为暂定状态并且界面当前音乐为设备内音乐
			// 显示设备内音乐、暂停本地音乐
			}else if(data.speakerPlayStatus==2&&this.playingInternal){
				this.playInternalMusic();
				this.trigger({currInfo:item, playing:false})
			}
		});
	},

	onSetDeviceData(data,item){
		Ajax.setMusicControl(data,()=>{
			audio.pause();
			setDataTimer('speakerPlayStatus','speakerSoundNumber','speakerSoundName','speakerSoundAlbums');
			this.trigger({
				currInfo:{
					msi:null,
					name:item.name,
					artist:item.artist||'未知'
				},
				playing:true
			})
		});
	},

	onGetList(){
		this.trigger({list:data.list, mode:data.mode, currInfo:this.getCurrItem()||{}});
	},

	// 获取指定id音乐对象
	getItem(id){
		var i, item, len = data.list.length;

		for(i = 0; i < len; i++){
			item = data.list[i];
			if(id == item.mid) return item;
		}

		return null;
	},

	// 获取当前选择音乐对象
	getCurrItem(){
		return this.getItem(data.currId);
	},

	// 获取指定id音乐的索引
	getItemIndex(id){
		var i, item, len = data.list.length;

		for(i = 0; i < len; i++){
			item = data.list[i];
			if(id == item.mid) return i;
		}

		return -1;
	},

	// 播放设备内音乐
	playInternalMusic(){
		this.playingInternal = true;
		audio.pause();
	},
	
	// 播放或暂停
	playOrPause(playing){

		if(this.playingInternal){

			Ajax.setMusicControl({speakerPlayStatus:playing?2:1});

			setDataTimer('speakerPlayStatus');

			this.trigger({playing:!playing})

		}else{
			if(!playing&&this.getCurrItem()){
				if(audio.src){
					audio.play();
				}else{
					this.change(data.currId)
				}

			}else{
				audio.pause();
			}
		}
	},

	// 根据id播放指定歌曲
	change(id, pause){
		if(id==-1) return this.trigger({currInfo:{}, list:data.list})

		var item = this.getItem(id);

		if(!item) return console.log('未找到该歌曲');

		// 添加到播放记录
		Records.add(item);

		data.currId = id;
		setLocalStorage('currId', id);

		audio.src = item.uri;

		// 当前为内置音乐，暂停设备播放
		if(this.playingInternal){
			this.playOrPause(true);
		}

		audio.paused&&(audio.load = function(){
			audio.play();
			this.trigger({currInfo:item, list:data.list})
		})

		// 延迟200ms执行，不延迟的话当自动播放情况下，设置src后开始播放，但paused属性任为false
		this.trigger({currInfo:item, list:data.list})
	},

	changeMode(){
		data.mode++;
		if(data.mode>2) data.mode = 0;
		this.trigger({mode: data.mode});
		setLocalStorage('mode', data.mode);
	},

	// 播放下一首
	next(){
		var icurr = this.getItemIndex(data.currId), 
			inext = icurr;

		if(data.mode==1){
			// 随机播放
			while(icurr==inext){
				inext = this.getRandom();
			}

		}else{
			// 顺序或单曲
			if(++inext > data.list.length-1){
				inext = 0;
			}
		}

		var item = data.list[inext];

		this.change(item ? item.mid : -1);
	},

	// 播放前一首
	prev(){
		var icurr = this.getItemIndex(data.currId), 
			iprev = icurr;

		if(data.mode==1){
			// 随机播放
			while(icurr==iprev){
				iprev = this.getRandom();
			}

		}else{
			// 顺序或单曲
			if(--iprev < 0){
				iprev = data.list.length - 1;
			}
		}
		
		var item = data.list[iprev];

		this.change(item ? item.mid : -1);
	},

	// 获取随机播放随机数
	getRandom(){
		return Math.round(Math.random()*data.list.length+1);
	},

	// 获取播放时间
	getCurrentTime(){
		return audio.currentTime;
	},

	// 设置播放时间
	setCurrentTime(time){
		audio.currentTime = time;
	},

	// 播放歌曲
	play(item){
		if(!this.isExist(item.mid)){
			data.list = data.list.concat(item);
			setLocalStorage('list',data.list);
			this.trigger({list:data.list})
		}
		this.change(item.mid);
	},

	// 新增到下一首
	addToNext(items){
		items = this.getNoExistItems(items);
		if(items.length){
			data.list.splice(data.currId,0,...items);
			setLocalStorage('list',data.list);
			this.trigger({list:data.list});
			if(audio.paused) this.change(items[0].mid);
		}
	},

	// 过滤掉列表中已经有的歌曲
	getNoExistItems(items){
		var arr = [];
		items.forEach((item)=>{
			if(!this.isExist(item.mid))
				arr.push(item);
		})
		return arr;
	},

	// 判断歌曲中是否存在列表中
	isExist(id){
		for(var i = 0; i < data.list.length; i++){
			if(data.list[i].mid==id) 
				return true;
		}
		return false;
	},

	// 指定删除
	removes(ids){
		typeof ids!=='object' && (ids = [ids]);
		var {list, currId} = data;

		var index = this.getItemIndex(currId);

		ids.forEach((id, i)=>{
			for(var j = 0; j < list.length;){
				var item = list[j];
				if(item&&item.mid==id) {
					list.splice(j, 1);
				}else{
					j++;
				}
			}
		})

		// 获取删除后当前位置的音乐，不存在的话获取最后一个
		var item = list[index] || list[list.length-1];

		if(ids.indexOf(currId)>-1){
			// 删除当前音乐时自动播放下一首
			audio.pause();
			this.change(item?item.mid:-1);
		}else{
			this.trigger({list:list})
		}
		setLocalStorage('list',list);
	},

	// 清空
	clear(){
		data.list.length = 0;
		this.trigger({list:data.list});
		setLocalStorage('list',data.list);
	}
})


export var audio = new Audio();
;(function(store){
	audio.autoplay = true;
	audio.addEventListener('ended',()=>{
		this.play = false;
		if(data.mode!=2) store.next();
		if(data.mode==2) {
			audio.currentTime = 0;
			audio.play();
		}
	});

	audio.onplay = function(){
		store.trigger({playing:true});
	}

	audio.onpause = function(){
		store.trigger({playing:false}) 
	}
}(locStgStore));



// 数据过滤计时器
let dataFilterTimers = {
    speakerPlayStatus:0,
    speakerSoundNumber:0,
    speakerSoundName:0,
    speakerSoundAlbums:0
};

// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 15e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}



