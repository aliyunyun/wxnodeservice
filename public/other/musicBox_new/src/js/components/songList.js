/*
	歌曲列表组件

	props:
		opts:
			list 		歌曲列表
			playSong	播放音乐函数
			showToolbar	显示工具栏函数
			mode		样式状态

		status: multi多选模式   single单选模式


	public供外部调用函数
		selectAll：选择或取消选择所有行
		getSelectedItems: 获取所有选择的行
*/

export default class SongList extends React.Component{

	selectAll(flag){
		var {list} = this.props.opts;
		list.forEach((item, i)=>{
			item.selected = flag;
		})
		this.setState({});
	}

	getSelectedItems(){
		var {list} = this.props.opts, selecteds = [];
		list.forEach((item, i)=>{
			item.selected && selecteds.push(item);
		})
		return selecteds;
	}

	// 点击列表直接播放音乐
	onTouchItem(item){
		var {playSong} = this.props.opts,
			status = this.props.status;

		if(status=='multi'){
			item.selected = !item.selected;

		}else{
			this.sid = item.mid;
			playSong(item);
		}

		this.setState({});
	}

	// 点击更多操作显示工具操作栏
	onTouchOper(item,e){
		var {showToolbar} = this.props.opts;

		this.sid = item.mid;
		showToolbar(item);
		e.stopPropagation();
	}

	/* 将秒数转化为 hh:mm:ss 格式 */
    formatSecond(a){
        if(!a || a < 0) return '00:00';

        var hh = parseInt(a/3600),
            mm = parseInt(a%3600/60),
            ss = parseInt(a%60);  

        return (hh>0?(this.format(hh) + ":"):'') + this.format(mm) + ":" + this.format(ss);  
    }

	/* 个位数时，十位补0 */
    format(d) {
        return d >= 10 ? d : ("0"+d);
    }

	render(){
		var {mode, list, status} = this.props.opts,
			status = this.props.status;

		if(!list || !list.length) return <div></div>;

		var html = list.map((item,i)=>{
			var {mid, name, artist, playCount, duration, selected} = item;

			playCount = playCount>10000 ? ((playCount/10000).toFixed(1)+'万') : playCount;
			duration = this.formatSecond(duration);

			// 单选的话根据this.sid重新设置selected项
			if(status!=='multi') selected= this.sid===mid;

			return (<li className={`item ${selected?'selected':''}`} key={mid} onTouchTap={this.onTouchItem.bind(this,item)}>
						<div className='selt_icon'><i></i></div>
						<div className='base_info'>
							<div className='name'>{name||'未知'}</div>
							{!mode&&<div className='singer'>{artist||'未知'}</div>}
							{mode&&<div className='singer'>
								<i className='playnum_icon'></i><span>{playCount||0}</span>
								<i className='num_icon'></i><span>{duration||0}</span>
							</div>}
						</div>
						<div className='oper_icon' onTouchTap={this.onTouchOper.bind(this,item)}><i></i></div>
					</li>)
		})
			
		return (<ul className={`song_list ${status}`}>{html}</ul>)
	}
}
