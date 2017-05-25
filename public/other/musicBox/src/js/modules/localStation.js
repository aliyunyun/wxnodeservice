import BaseModule from '../baseModule';
import SongList from '../components/songList';	
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import {Panel} from '../libs/localStore';
import {Collects} from '../libs/sington';
import IScroll from '../plugins/iscroll-probe';

export default class LocalStation extends BaseModule{
	constructor(props){
		super(props);
		_.extend(this.state, {panels:[]});
		this.state.toolbar.events = this.toolEvent();
	}

	componentDidMount(){
		document.title='本地电台';

		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		this.getData();
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	getData(){
		Ajax.getLocalRadio({paged:false}, (data)=>{
			this.loaded = true;
			var currId = Panel.getId('localStation') || data[0].subCategoryId;
			this.setState({panels:data,currId:currId});
			this.refreshScroll();
		})
	}

	selectPanel(pid){
		Panel.setId('localStation',pid);
		this.setState({currId:pid})
		this.refreshScroll();
	}

	setSimpleTools(item){
		this.state.toolbar.tools = [
			{name:'toNext'},
			{name:'toAlbum'},
			{name:'collect', hasCollect:Collects.has(item)}
		]
	}

	onTouchItem(item){
		this.playSong(item);
	}

	onTouchOper(item,e){
		this.showToolbar(item);
		e.stopPropagation();
	}

	render(){
		var list = [];
		var doms = this.getDoms();
		var arr = {
			music:'音乐',
			education:'教育',
			news:'新闻',
			sports:'运动'
		}
		return (
            <div className='page page_internal page_ls'>
                <header className='header'>
                	<div className='panel'>
                    	{this.state.panels.map((item,i)=>{
                    		var pid = item.subCategoryId;
                    		if(this.state.currId==pid) {
                    			this.state.songs.list = item.radiosList.map((item)=>{
                    				return {
                    					mid: item.music_id,
	                        			name:item.name,
	                        			artist:item.artist,
	                        			uri:item.uri,
	                        			sourceType:2
                    				}
                    			});
                    		}
                    		return (<span key={pid} onTouchTap={this.selectPanel.bind(this,pid)} className={this.state.currId==pid?'selected':''}>{arr[item.categroy]}</span>)
                    	})}
                    </div>
                </header>

                {/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                	<div className={'scroller '}>
                		<ul className='list'>
                        	{this.state.songs.list.map((item,i)=>{
                        		return (<li key={item.mid} onTouchTap={this.onTouchItem.bind(this,item)}>
                        					<span>{item.name}</span>
                        					<div className='oper_icon' onTouchTap={this.onTouchOper.bind(this,item)}><i></i></div>
                        				</li>)
                        	})}
                        </ul>
                	</div>
                </section>

                {doms}
            </div>
        )
	}
}