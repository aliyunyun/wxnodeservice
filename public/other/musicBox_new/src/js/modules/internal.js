import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Toolbar from '../components/toolbar';
import Ajax from '../libs/ajax';
import IScroll from '../libs/iscroll-probe';
import {Panel} from '../stores/store';

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
		this.myScroll = new IScroll('#wrapper',{mouseWheel: true});
		Ajax.getRoomeMusicList({}, (data)=>{
			// TODO 异常处理
			var currId = Panel.getId('internal') || data[0].subCategoryId;
			this.setState({panels:data,currId:currId});
			this.refreshScroll();
		})
		
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}


	/* 点击歌曲事件 */
	onTouchItem(item){
		this.selects = item.id;
		Actions.setDeviceData({musicId:item.id,speakerPlayStatus:1},item)
	}

	selectPanel(pid){
		Panel.setId('internal',pid);
		this.setState({currId:pid})
		this.refreshScroll();
	}


	render(){
		var list = [];
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
                        		return (<li key={item.id} onTouchTap={this.onTouchItem.bind(this,item)}>
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