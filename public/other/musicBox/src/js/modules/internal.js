import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Toolbar from '../components/toolbar';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';
import {Panel} from '../libs/localStore';

import {Actions} from '../actions/action';

export default class Internal extends React.Component{

	state = {
		currId:0,
		list:[],
		panels:[]
	}

	componentWillMount(){
		document.title='设备内音乐';
	}

	componentDidMount(){
		if(document.getElementById('wrapper'))
			this.scroll = new IScroll('#wrapper',{probeType:3});

		Ajax.getRoomeMusicList({}, (res)=>{
			this.loaded = true;
			if(res.code!=0) return;
			var currId = Panel.getId('internal') || res.data[0].subCategoryId;
			this.setState({panels:res.data,currId:currId});
			this.refreshScroll();
		})
	}

	componentDidUpdate(){
		if(document.getElementById('wrapper')&&!this.scroll)
			this.scroll = new IScroll('#wrapper',{probeType:3});
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.scroll.refresh();
		},0)
	}


	/* 点击歌曲事件 */
	onTouchItem(item){
		this.selects = item.id;
		Actions.playInternalMusic(item);
	}

	selectPanel(pid){
		Panel.setId('internal',pid);
		this.setState({currId:pid})
		this.refreshScroll();
	}


	render(){
		var list = [];

		if(!this.loaded) {
			// 未获取数据前的界面展示
			return <div className='loading'>正在加载...</div>
		};

		return (
            <div className='page page_internal'>
                <header className='header'>
                	<div className='panel'>
                    	{this.state.panels.map((item,i)=>{
                    		var pid = item.subCategoryId;
                    		if(this.state.currId==pid) list = item.roomeMusicList;
                    		return (<span key={pid} onTouchTap={this.selectPanel.bind(this,pid)} className={this.state.currId==pid?'selected':''}>{item.desc}</span>)
                    	})}
                    </div>
                </header>

                {/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                	<div className={'scroller '}>
                		<ul className='list'>
                        	{list.map((item,i)=>{
                        		return (<li key={item.id} onTouchTap={this.onTouchItem.bind(this,item)} className={item.id==this.selects?'selected':''}>
                        					<span>{item.name}</span>
                        				</li>)
                        	})}
                        </ul>
                	</div>
                </section>

                <Tips ref='tips' tip={this.state.tip}/>
            </div>
        )
	}
}