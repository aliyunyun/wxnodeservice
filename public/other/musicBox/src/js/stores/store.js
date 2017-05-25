'use strict';

import {Actions} from '../actions/action';
import Ajax from '../libs/ajax';
import _ from '../plugins/loadsh';
import {Play,Records} from '../libs/localStore';
import {Internal} from '../libs/sington';
import {PlayMode, PlayStatus, PlayOper, PlaySource} from '../libs/const';


export const Store = Reflux.createStore({

	// 当前播放源
	playSource:PlaySource.NETWORK,

	// 当前播放状态
	playStatus:PlayStatus.PAUSE,

	// 当前播放模式(内置音乐模式)
	playMode:PlayMode.ORDER,

	// 当前播放音乐信息
	currInfo:{},

	listenables:[Actions],

	_trigger(){
		var data, mode, currInfo, list;

		if(this.playSource==PlaySource.INTERNAL){
			mode = this.playMode;
			currInfo = this.currInfo;
			list = Internal.getList();

		}else{
			mode = Play.getMode();
			currInfo = Play.getCurrItem()||{};
			list = Play.getList();
		}

		data = {
			playSource: this.playSource,
			playStatus: this.playStatus,
			playMode: mode,
			list: list,
			currInfo:currInfo
		}

		this.trigger(data);
	},

	onGetList(){
		this._trigger();
	},

	// 获取星月灯设备运行数据
	onGetDeviceData(){
		Ajax.getData((res)=>{
			var data, music = {};

			if(res.code!=0) 
				return console.log('onGetDeviceData:' + res.msg);

			// 防跳变过滤数据
			data = dataFilter(res.data);

			if(data.speakerSoundSource)
				this.playSource = data.speakerSoundSource;

			// SD卡内置音乐播放
			if(this.playSource == PlaySource.INTERNAL){
				!audio.paused&&audio.pause();

				if(data.speakerSoundNumber){
					music = Internal.getItem(data.speakerSoundNumber);
					this.currInfo = {
						mid:music.id,
						msi:null,
						name:music&&music.name||'未知',
						artist:'未知'
					}
				}

				if(data.speakerPlayStatus!=undefined)
					this.playStatus = data.speakerPlayStatus;

				if(data.speakerMode!=undefined)
					this.playMode = data.speakerMode;

				this._trigger();
			}
		});
	},

	// 播放内置音乐
	onPlayInternalMusic(music){
		if(!music) return;

		this.playSource = PlaySource.INTERNAL;
		this.playStatus = PlayStatus.PLAY;
		this.currInfo = {
			mid:music.id,
			msi:null,
			name:music.name,
			artist:music.artist||'未知'
		}

		setDataTimer('speakerPlayStatus','speakerSoundNumber','speakerSoundSource');

		!audio.paused&&audio.pause();

		Ajax.setMusicControl({
			speakerSoundSource:this.playSource,
			speakerPlayStatus:this.PlayStatus,
			speakerSoundNumber:music.id
		})

		this._trigger();
	},

	// 播放网络音乐
	onPlayNetWorkMusic(music){
		// 当前音源为内置音乐时，发送命令到设备切换到蓝牙播放
		if(this.playSource==PlaySource.INTERNAL){
			setDataTimer('speakerSoundSource');
			Ajax.setMusicControl({speakerSoundSource:PlaySource.NETWORK});
		}

		this.playSource = PlaySource.NETWORK;
		this.playStatus = PlayStatus.PLAY;

		// 添加音乐到播放列表
		Play.play(music);

		this.onChange(music.mid);

		this._trigger();
	},
	
	// 播放或暂停
	onPlayOrPause(playing){
		this.playStatus = playing ? PlayStatus.PAUSE : PlayStatus.PLAY;

		if(this.playSource==PlaySource.INTERNAL){
			setDataTimer('speakerPlayStatus');
			Ajax.setMusicControl({speakerPlayStatus:this.playStatus});

		}else{
			var music = Play.getCurrItem();

			if(!playing&&music){
				audio.src ? audio.play() : this.onChange(music.mid);

			}else{
				audio.pause();
			}
		}

		this._trigger();
	},

	// 改变播放模式
	onChangeMode(){
		if(this.playSource == PlaySource.INTERNAL){
			switch(this.playMode){
				case PlayMode.ORDER:
					this.playMode = PlayMode.SINGLE;
					break;
				case PlayMode.SINGLE:
					this.playMode = PlayMode.RANDOM;
					break;
				case PlayMode.RANDOM:
					this.playMode = PlayMode.ORDER;
					break;
			}
			setDataTimer('speakerMode');
			Ajax.setMusicControl({speakerMode:this.playMode});
			
		}else{
			switch(Play.getMode()){
				case PlayMode.ORDER:
					Play.setMode(PlayMode.SINGLE);
					break;
				case PlayMode.SINGLE:
					Play.setMode(PlayMode.RANDOM);
					break;
				case PlayMode.RANDOM:
					Play.setMode(PlayMode.ORDER);
					break;
			}
		}
		this._trigger();
	},

	// 播放下一首
	onNext(){
		this.oper(PlayOper.NEXT);
		this._trigger();
	},

	// 播放上一首
	onPrev(){
		this.oper(PlayOper.PREV);
		this._trigger();
	},

	// 新增到下一首
	onAddToNext(items){
		if(Play.addToNext(items)) this._trigger();
	},

	// 删除播放列表音乐
	onRemove(ids){
		var music = Play.remove(ids);

		// 删除当前音乐的时候自动播放下一首
		if(music){
			audio.pause();
			this.onChange(music.mid);
		}

		this._trigger();
	},

	// 清空
	onClear(){
		Play.clear();
		this._trigger();
	},

	// 根据id播放指定歌曲
	onChange(id){
		if(this.playSource==PlaySource.INTERNAL){
			var music = Internal.getItem(id);
			this.onPlayInternalMusic(music);

		}else{
			var music = Play.getItem(id);

			if(!music) return console.log('未找到该歌曲');

			Play.setCurrId(id);

			// 添加到播放记录
			Records.add(music);

			audio.src = music.uri;
			audio.paused&&(audio.load = function(){
				audio.play();
			})
			audio.play();
		}
	},


	oper(operate){
		if(this.playSource == PlaySource.INTERNAL){
			Ajax.setMusicControl({speakerOperate:operate});

		}else{
			var item = Play.getLaterItem(operate);

			this.onChange(item ? item.mid : -1);
		}
	},

	// 获取播放时间
	getCurrentTime(){
		return audio.currentTime;
	},

	// 设置播放时间
	setCurrentTime(time){
		audio.currentTime = time;
	}
})


export var audio = new Audio();
;(function(){
	audio.autoplay = true;
	audio.addEventListener('ended',()=>{
		if(Store.playSource==PlaySource.NETWORK){
			if(Play.getMode()==PlayMode.SINGLE){
				audio.currentTime = 0;
				audio.play();
			}else{
				Store.onNext();
			}
		}
	});

	audio.onplay = function(){
		if(Store.playSource==PlaySource.NETWORK){
			Store.playStatus = PlayStatus.PLAY;
			Store._trigger();
		}
	}

	audio.onpause = function(){
		if(Store.playSource==PlaySource.NETWORK){
			Store.playStatus = PlayStatus.PAUSE;
			Store._trigger();
		}
	}

	audio.onerror = function(info){
		if(Store.playSource==PlaySource.NETWORK){
			Store.onNext();
/*			Store.playStatus = PlayStatus.PAUSE;
			Store._trigger();*/
		}
	}
}());



// 数据过滤计时器
let dataFilterTimers = {
    speakerPlayStatus:0,
    speakerSoundNumber:0,
    speakerSoundSource:0
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
    let time = (new Date).getTime() + 15e3; // 15秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}



