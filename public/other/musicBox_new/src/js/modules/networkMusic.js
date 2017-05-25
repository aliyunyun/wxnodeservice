import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {audio,locStgStore} from '../stores/store';
import IScroll from '../libs/iscroll-probe';

export default class NetworkMusic extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {});
		this.state.toolbar.events = this.toolEvent();
	}

	componentDidMount(){
		document.title=this.props.params.title;

		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		this.getData();
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	getData(){
		Ajax.getXmlyAlbumMusics({album_id:this.props.params.id,count:this.pageSize}, (data)=>{
			this.loaded = true;
			var list = this.state.songs.list;
			if(data&&data.tracks&&data.tracks.length){
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
		var {playsCount, tracksCount} = this.props.params;
		var {album_title, album_intro, cover_url_large} = this.state.songs;
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
            <div className='page nw_music'>
            	{/* 顶部固定区域 */}
            	<header className='header'>
            		<div className='group_info' style={{backgroundImage:`url(${cover_url_large})`}}>
                		<div className='opa_dim'></div>
                		<div className='info'>
                			<div className='base_info'>
                    			<div className='name'>{album_title}</div>

                    			<div className='flex'>
                    				<span className='desc'>{album_intro}</span>
                    				<div className='num'>
                    					<i className='playnum_icon'></i><span>{playsCount}</span>
                    					<i className='num_icon'></i><span>{tracksCount}集</span>
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