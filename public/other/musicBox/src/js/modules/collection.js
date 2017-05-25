import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';
import {Collects} from '../libs/sington';

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
		events.delete = function(items){
			supDelete((items)=>{
				self.cancelMulti();
				var musicList = [];
				items.forEach((item)=>{
					musicList.push({
						musicId:item.mid,
						sourceType:item.sourceType
					})
				})

				self.setState({confirm:{show:false}})
				self.reset();

				Ajax.deleteMusicFromCustomAlbum({musicList:musicList},(res)=>{
					if(res.code!=0) return;

					Collects.remove(items);

					// 删除ui列表中的歌曲
					var list = self.state.songs.list
					items.forEach((item)=>{
						for(var i = 0; i < list.length; i++){
							if(item.mid==list[i].mid&&item.sourceType==list[i].sourceType){
								list.splice(i,1);
								break;
							}
						}
					});

					self.refs.tips.showMsg('删除成功')
					self.setState({});
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
			// 未获取数据前的界面展示
			return <div className='loading'>正在加载...</div>
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