import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import AlbumsPop from '../components/albumsPop';
import {audio,locStgStore,Collects} from '../stores/store';
import Ajax from '../libs/ajax';
import {Slider} from '../components/Slider';
import BaseModule from '../baseModule';


export default class Player extends BaseModule{

	constructor(props){
		super(props);
		_.extend(this.state, {});
	}

	componentDidMount(){
		this.timer = setInterval(()=>{
			this.setState({});
		},1000)
	}

	componentDidUpdate(){
		document.title=this.props.currInfo.name||'歌曲';
	}

	componentWillMount(){
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	

	/* 加到歌单 */
	addToList(items){
		if(!items) return;

		var self = this;
		items = [].concat(items);
		this.state.showDim = true;
		this.setState({
			albumsPop:{
				musics:items,
				show:true,
				callBack(res){
					if(res.code!=0) 
						return self.refs.tips.showMsg('添加失败');
					self.refs.tips.showMsg('添加成功');
					self.state.albumsPop.show = false;
					self.reset();
				}
			}
		})
	}

	/* 收藏歌曲 */
	collect(item){
		if(!item) return;

		var musicList = [{
			musicId:item.mid,
			sourceType:item.sourceType
		}];

		if(Collects.has(item)){
			Ajax.deleteMusicFromCustomAlbum({musicList:musicList},(res)=>{
				if(res.code==0){
					Collects.remove(item)
					//this.refs.tips.showMsg('取消收藏');
					this.setState({});
				}
			})
		}else{
			Ajax.addMusicsToCustomAlbum({musicList:musicList},(res)=>{
				if(res.code==0){
					Collects.add(item)
					//this.refs.tips.showMsg('收藏成功');
					this.setState({});
				}
			})
		}
	}

	showList(){
		this.props.showPlayList();
	}

	playOrPause(playing){
		locStgStore.playOrPause(playing);
		this.setState({})
	}

	prev(){
		locStgStore.prev();
	}

	next(){
		locStgStore.next();
	}

	setCurrentTime(value){
		audio.currentTime = value;
	}



	render(){
		var item = this.props.currInfo;
		var {name, mmi,artist} = item
		var playing = this.props.playing;

		var bgStyle = {
			backgroundImage:`url(${mmi||'../static/imgs/pic-75音乐默认背景@2x.jpg'})`,
			backgroundSize:'100% 100%'
		}
		var status = audio.paused?'start':'stop';
		var duration = !audio.duration||audio.duration==Infinity ? 0 : audio.duration;

		var doms = this.getDoms();
		return (
	        <div className='page page_player' style={bgStyle}>
	        	<div className='masking'></div>
	           	<div className='content'>
	           		<div className='song_info'>
	           			{/*<div className='name'>{name}</div>*/}
	           			<div className='singer'>{artist}</div>
	           			<div className='head_img'><img className={audio.paused?'':'music_img'} src={mmi||'../static/imgs/pic-74@2x.png'}/></div>
	           		</div>
	           		<div className='extend_ope'>
	           			<div><i className='add' onTouchTap={this.addToList.bind(this,item)}></i></div>
		           		<div><i className={Collects.has(item)?'collected':'uncollected'} onTouchTap={this.collect.bind(this,item)}></i></div>
		           		<div><i className={'mode mode'+this.props.mode} onTouchTap={locStgStore.changeMode.bind(locStgStore)}></i></div>
		           		<div><i className='list' onTouchTap={this.showList.bind(this)}></i></div>
	           		</div>
	           	</div>
	           	<div className='bottom_bar'>

	           		<div className='silder'>
	           			<Slider min="0" max={duration} changeValue={this.setCurrentTime.bind(this)} value={audio.currentTime}></Slider>

	           		</div>
	           		<div className='song_ope'>
		           		<div><i className='prev' onTouchTap={this.prev.bind(this)}></i></div>
		           		<div><i className={'control '+ (playing?'stop':'start')} onTouchTap={this.playOrPause.bind(this,playing)}></i></div>
		           		<div><i className='next' onTouchTap={this.next.bind(this)}></i></div>
		           	</div>
	           	</div>

	           	{doms}
	        </div>
        )
	}
}