import {PlayMode, PlayOper} from '../libs/const';


// 是否显示蓝牙配对提示
export var blueToothTip = (function(){
	var show = true;

	return{
		isHide(){
			getLocalStorage('hideBTTip')=='1';
		},

		hide(){
			setLocalStorage('hideBTTip', 1);
		},

		close(){
			show = false;
		}
	}
}())

// 播放列表信息
export var Play = (function(){
	/*
		当前播放音乐的ID
	*/
	var currId = getLocalStorage('currId') || 0;


	/*
		播放模式
		0：顺序播放  1：单曲循环  3：随机播放  
	*/
	var mode = getLocalStorage('mode') || 0;

	
	/*
		播放列表音乐信息
			音乐id，音乐名称，播放链接，小图，中图，音乐作者
			mid, name, uri, msi, mmi, artist
	*/
	var list = getLocalStorage('list') || [];

	if(!currId&&list.length)
		currId = list[0].mid;

	return {
		getCurrId(){
			return currId;
		},

		getMode(){
			return mode;
		},

		getList(){
			return list;
		},

		getCurrItem(){
			return this.getItem(currId);
		},

		setCurrId(id){
			currId = id;
			setLocalStorage('currId',id);
		},

		setMode(val){
			mode = val;
			setLocalStorage('mode', val);
		},

		getItem(id){
			var index = this.getItemIndex(id);

			if(index!=-1){
				return list[index];
			}
			return null;
		},

		// 判断歌曲中是否存在列表中
		isExist(id){
			return this.getItemIndex(id)!=-1;
		},

		// 获取指定id音乐的索引
		getItemIndex(id){
			var i, len = list.length;

			for(i = 0; i < len; i++){
				if(id == list[i].mid) 
					return i;
			}
			return -1;
		},

		/*
			删除播放列表音乐
			@params
				ids 要删除的音乐id或id数组

			@return 如果删除了当前音乐，返回新的当前音乐
		*/
		remove(ids){
			var j, item;

			ids = [].concat(ids);

			ids.forEach((id, i)=>{
				for(j = 0; j < list.length;){
					item = list[j];
					if(item&&item.mid==id) {
						list.splice(j, 1);
					}else{
						j++;
					}
				}
			})
			setLocalStorage('list',list);

			// 删除了当前currId，重新设置currId
			if(ids.indexOf(currId)>-1){
				var index = this.getItemIndex(currId);

				// 获取删除后当前位置的音乐，不存在的话获取最后一个
				var	item = list[index] || list[list.length-1];

				currId = item ? item.mid : -1;
				setLocalStorage('currId',currId);

				return item;
			}
		},

		// 新增到下一首
		addToNext(items){
			items = this.getNoExistItems(items);
			if(items.length){
				var index = this.getItemIndex(currId);
				list.splice(index+1,0,...items);
				setLocalStorage('list',list);
			}
			return items.length;
		},

		// 播放歌曲
		play(item){
			if(!this.isExist(item.mid)){
				list = list.concat(item);
				setLocalStorage('list',list);
			}
			setLocalStorage('currId',item.mid);
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

		// 获取以后的歌曲（随机一个，上一个，下一个）
		getLaterItem(operate){
			var icurr = this.getItemIndex(currId), 
				ilater = icurr;

			if(mode==PlayMode.RANDOM){
				// 随机播放
				while(icurr==ilater){
					ilater = this.getRandom();
				}

			}else{
				// 顺序或单曲
				if(operate==PlayOper.PREV && --ilater<0){
					ilater = list.length - 1;
				}

				if(operate==PlayOper.NEXT && ++ilater>list.length-1){
					ilater = 0;
				}
			}

			this.setCurrId(list[ilater].mid);
			
			return list[ilater];
		},

		getRandom(){
			return parseInt(Math.random()*list.length);
		},

		clear(){
			list.length = 0;
			setLocalStorage('list',list);
		}
	}
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
	存储标签栏id，当通过强制刷新或回退键直接访问页面时，直接定位到
	存储的panel, 通过链接访问页面时应设置为默认的第一个panel。
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