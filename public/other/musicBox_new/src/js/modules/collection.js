import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {audio,locStgStore} from '../stores/store';
import IScroll from '../libs/iscroll-probe';

export default class Collection extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {});
		this.state.toolbar.events = this.toolEvent();
	}

	componentDidMount(){
		document.title='我的收藏';
		
		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		this.getData();
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	getData(){
		Ajax.getCollectList({paged:false}, (data)=>{
			this.loaded = true;
			var list = [];
			if(data&&data.length){
				data.forEach((s)=>{
					list.push({
						mid: s.music_id,
						name:s.name,
						uri:s.uri,
						msi:s.image_url_small,
						mmi:s.image_url_middle,
						artist:s.artist,
						sourceType:s.sourceType
					})
				})
			}
			this.state.songs.list = list;
			this.setState({});
			this.refreshScroll();
		})
	}

	setMulitTools(){
		this.state.toolType = 'mulit';
		this.state.toolbar.tools = [
			{name:'toNext', text:'添加到播放'},
			{name:'toAlbum'},
			{name:'collect', icon:'64', fun(){}},
			{name:'delete'}
		]
	}

	setSimpleTools(item){
		this.state.toolType = 'single';
		this.state.toolbar.tools = [
			{name:'toNext'},
			{name:'toAlbum'},
			{name:'collect', icon:'64', fun(){}},
			{name:'delete'}
		]
	}

	toolEvent(){
		var self = this, events = super.toolEvent();

		/* 重写删除歌曲事件 */
		var supDelete = events.delete;
		events.delete = function(){
			supDelete((items)=>{
				this.cancelMulti();
				var musicList = [];
				ids.forEach((item)=>{
					musicList.push({
						musicId:item.music_id,
						sourceType:item.sourceType
					})
				})
				Ajax.deleteMusicFromCustomAlbum({list:musicList},(data)=>{
					self.refs.tips.showMsg('删除成功')
				})
			})
		}

		return events;
	}

	render(){
		var className;
		if(this.state.status=='multi'&&this.state.toolbar.show){
			className = 'scro_bottom2'
		}else{
			className = 'scro_bottom1'
		}

		var multiBar = this.getMulitBar();
		var doms = this.getDoms();

		if(!this.loaded) {
			// 为获取数据前的界面展示
			return <div>正在加载</div>
		};

		return (
            <div className='page page_collection'>
            	{/* 顶部固定区域 */}
            	<header className='header'>
            		{multiBar}
            	</header>

            	{/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                    <div className={'scroller '+className}>
                    	<SongList ref='songList' opts={this.state.songs} status={this.state.status}/>
                    </div>
                </section>
                
                {doms}
            </div>
        )
	}
}