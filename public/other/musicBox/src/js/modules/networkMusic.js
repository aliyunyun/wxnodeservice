import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {Collects} from '../libs/sington';
import IScroll from '../plugins/iscroll-probe';

export default class NetworkMusic extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {});
		this.state.toolbar.events = this.toolEvent();
		this.baseInfo = JSON.parse(this.props.params.baseInfo);
	}

	componentDidMount(){
		document.title=this.baseInfo.title;

		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		this.getData();
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	setMulitTools(){
		this.state.toolType = 'mulit';
		this.state.toolbar.tools = [
			{name:'toNext', text:'添加到播放'},
			{name:'toAlbum'},
			{name:'collect'}
		]
	}

	setSimpleTools(item){
		this.state.toolType = 'single';
		this.state.toolbar.tools = [
			{name:'toNext'},
			{name:'toAlbum'},
			{name:'collect', hasCollect:Collects.has(item)}
		]
	}

	getData(){

		Ajax.getXmlyAlbumMusics({album_id:this.baseInfo.id,count:this.pageSize}, (data)=>{
			this.loaded = true;
			var list = this.state.songs.list;
			if(data&&data.tracks&&data.tracks.length){
				this.state.songs.artist = data.tracks[0].announcer.nickname;
				data.tracks.forEach((item)=>{
					list.push({
						mid: item.id,
						name:item.track_title,
						uri:item.play_url_32,
						msi:item.cover_url_small,
						mmi:item.cover_url_middle,
						artist:item.announcer.nickname,
						sourceType:1
					})
				})
			}
			this.state.songs.album_title = data.album_title;
			this.state.songs.album_intro = data.album_intro;
			this.state.songs.cover_url_large = data.cover_url_large;

			this.setState({});
			this.refreshScroll();
		})
	}

	render(){
		var baseInfo = this.baseInfo;

		var {album_title, artist, album_intro, cover_url_large, play_count} = this.state.songs;
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
            <div className='page nw_music'>
            	{/* 顶部固定区域 */}
            	<header className='header'>
            		<div className='group_info' style={{backgroundImage:`url(${cover_url_large||baseInfo.img})`}}>
                		<div className='opa_dim'></div>
                		<div className='info'>
                			<div className='base_info'>
                    			<div className='name'>{album_intro||baseInfo.intro}</div>

                    			<div className='flex'>
                    				<span className='desc'>{artist||baseInfo.artist}</span>
                    				<div className='num'>
                    					<i className='playnum_icon'></i><span>{play_count||baseInfo.playsCount}</span>
                    					<i className='num_icon'></i><span>{this.state.songs.list.length}集</span>
                    				</div>
                    			</div>
                    		</div>
                		</div>
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
            </div>
        )
	}
}


class List extends React.Component{
	
}