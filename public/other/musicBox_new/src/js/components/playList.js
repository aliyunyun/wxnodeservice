import IScroll from '../libs/iscroll-probe';

import {locStgStore} from '../stores/store'

export default class PlayList extends React.Component{

	state = {
		show:true
	}

	constructor(props){
		super(props);
		this.state.show = props.show;
	}

	componentDidMount(){
		this.myScroll = new IScroll('#listWrap',{mouseWheel: true});
	}

	componentDidUpdate(){
		this.refreshScroll();
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}

	del(id, e){
		locStgStore.removes(id);
		e.stopPropagation();
	}

	toggle(isShow){
		setTimeout(()=>{
			this.show = true;
			this.setState({show:isShow});
		},10)
	}

	clearList(){
		locStgStore.clear();
	}

	render(){
		var {currId, list} = this.props, arr;

		if(list.length){
			arr = list.map((item, i)=>{
				var {mid, name, artist} = item;
				return (<li key={i} className={''+(currId==mid?'selected':'')} onTouchTap={locStgStore.change.bind(this,mid)}>
							<div>
								<span className='pl_title'>{name}</span><span className='singer'>{artist}</span>
								<span className='icon_wrap'><i className='playing_icon'></i></span>
								<i className='del_icon' onTouchTap={this.del.bind(this,mid)}></i>
							</div>
					</li>)
			})
		}else{
			arr = <div className='empty_playlist'>播放列表无歌曲</div>;
		}
		

		var show = this.state.show;

		return (
			<div className={'dim_wrap '+(this.show?(show?'ashow':'ahide'):'')}>
				<div className={'dim '+(show?'show':'hide')} onTouchTap={this.toggle.bind(this,false)}></div>
				<div className='playlist'>
					<div className='top_line'><span>播放列表</span><i className='clear_icon' onTouchTap={this.clearList.bind(this)}></i></div>
					<div className='list_wrap' id='listWrap'><ul>{arr}</ul></div>
					<div className='bottom_line' onTouchTap={this.toggle.bind(this,false)}><span>关闭</span></div>
				</div>
			</div>)
	}
}