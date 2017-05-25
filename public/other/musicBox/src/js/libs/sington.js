import Ajax from '../libs/ajax';

/*
	收藏信息
*/
export var Collects = {};
;(function(Ajax){

	Collects.list = [];

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
		var arr = [].concat(items);

		arr.forEach((item)=>{
			if(!this.has(item))
				this.list.push(item);
		})
	}

	Collects.remove = function(items){
		var list = this.list;

		var arr = [].concat(items);

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
}(Ajax));

/*
	内置音乐
*/
export var Internal = {};
;(function(Ajax){

	Internal.list = [];

	Ajax.getRoomeMusicList({}, (res)=>{
		if(res.code!=0) return;
		Internal.list = res.data;
	});

	// 获取内置音乐
	Internal.getData = function(callback){
		return this.list;
	}

	Internal.getList = function(){
		var list = [], i = 0, j;

		for(; i < this.list.length; i++){
			var item = this.list[i];
			for(j = 0; j < item.roomeMusicList.length; j++){
				var music = item.roomeMusicList[j];
				list.push({
					mid:music.id,
					name:music.name,
					artist:'未知',
					msi:null
				});
			}
		}
		return list;
	}

	// 根据id获取
	Internal.getItem = function(id){
		var i = 0, j;
		for(; i < this.list.length; i++){
			var item = this.list[i];
			for(j = 0; j < item.roomeMusicList.length; j++){
				var music = item.roomeMusicList[j];
				if(music.id==id) return music;
			}
		}
		return null;
	}
}(Ajax));





