import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {audio,locStgStore,Records} from '../stores/store';
import IScroll from '../libs/iscroll-probe';

export default class Recent extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {});
		this.state.toolbar.events = this.toolEvent();
		this.state.songs.list = Records.getList();
	}

	componentDidMount(){
		document.title='最近播放';

		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	toolEvent(){
		var self = this, events = super.toolEvent();

		/* 重写删除歌曲事件 */
		var supDelete = events.delete;
		events.delete = function(){
			supDelete((items)=>{
				self.setState({confirm:{show:false}})
				self.reset();
				Records.remove(items);
			})
		}

		return events;
	}

	render(){
		var {name, id} = this.props.params;
		var className;
		if(this.state.status=='multi'&&this.state.toolbar.show){
			className = 'scro_bottom2'
		}else{
			className = 'scro_bottom1'
		}

		var multiBar = this.getMulitBar();
		var doms = this.getDoms();

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