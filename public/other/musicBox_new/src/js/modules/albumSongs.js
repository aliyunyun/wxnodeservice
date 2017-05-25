import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {audio,locStgStore,Collects} from '../stores/store';
import IScroll from '../libs/iscroll-probe';

export default class AlbumSongs extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {});
		this.state.toolbar.events = this.toolEvent();
	}

	componentDidMount(){
		document.title=this.props.params.name;
		
		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		this.getData();
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	getData(){
		var obj = {
			albumsCustomId:this.props.params.id,
			paged:false
		}

		Ajax.getMusicsFromCustomAlbum(obj, (data)=>{
			this.loaded = true;
			var arr = data.map((s)=>{
				return {
					mid: s.music_id,
					name:s.name,
					uri:s.uri,
					msi:s.image_url_small,
					mmi:s.image_url_middle,
					artist:s.artist,
					sourceType:s.sourceType
				}
			})

			this.state.songs.list = arr;
			this.setState({});
			this.refreshScroll();
		})
	}

	moreOpea(item){
		var self = this;
		this.state.toolType = 'all';
		this.state.toolbar.tools = [
			{name:'toAlbum'},
			{name:'collect', hasCollect:Collects.has(item)},
			{name:'edit',fun(){
				self.onEditAlbum();
			}},
			{name:'delete', fun(){
				self.onDeleteAlbum();
			}}
		];
		this.state.showDim = true;
		this.state.toolbar.show = true;
		this.setState({});
	}

	toolEvent(){
		var self = this, events = super.toolEvent();

		/* 重写删除歌曲事件 */
		var supDelete = events.delete;
		events.delete = function(){
			supDelete((items)=>{
				var musicList = [];

				items.forEach((item)=>{
					musicList.push({
						albumsCustomId:self.props.params.id,
						musicId:item.mid,
						sourceType:item.sourceType
					})
				})

				self.setState({confirm:{show:false}})
				self.reset();

				// 删除歌曲
				Ajax.deleteMusicFromCustomAlbum({musicList:musicList},(res)=>{
					if(res.code!=0) return;

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
				});
			})
		}

		return events;
	}

	onEditAlbum(){
		var {id, name} = this.props.params;
		location.hash = `#/albums/build/${id}/${encodeURIComponent(name)}`;
	}

	onDeleteAlbum(){
		var self = this;
		this.setState({confirm:{
			show:true,
			content:'确定删除该歌单吗？',
			onCancel(){
				self.setState({confirm:{show:false}})
			},
			onConfirm(){
				Ajax.deleteCustomAlbum({albumsCustomId:self.props.params.id}, (res)=>{
					if(res.code!=0) 
						return self.refs.tips.showMsg('删除失败');

					location.hash = '#/albums/index';
				})
				
			}
		}})
	}

	render(){
		var {name, id, img} = this.props.params;
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
            <div className='page page_detail'>
            	{/* 顶部固定区域 */}
            	<header className='header'>

                	<div className='palylist_info'>
                		<div className='img_wrap'><img src={img}/></div>
                		<div className='base_info'>
                			<div className='name'>{name}</div>
                			<div className='num'><i></i><span>{this.state.songs.list.length}首</span></div>
                		</div>
                		<div className='more' onTouchTap={this.moreOpea.bind(this)}><span><i></i></span></div>
                	</div>

                	{multiBar}
                </header>

            	{/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                    <div className={'scroller '+className}>
                    	<SongList ref='songList' opts={this.state.songs} status={this.state.status}/>
                    </div>
                </section>

                {doms}

                {this.loaded&&!this.state.songs.list.length&&
                	<div className='empty_detail'>
                		<img src='../static/imgs/pic-53@2x.png' /><br/>
                		<span>这个歌单没有歌曲</span>
                		<div className='btn_wrap'>
                			<span onTouchTap={this.onEditAlbum.bind(this)}>编辑歌单</span>
                			<span onTouchTap={this.onDeleteAlbum.bind(this)}>删除</span>
                		</div>
                	</div>}
            </div>
        )
	}
}