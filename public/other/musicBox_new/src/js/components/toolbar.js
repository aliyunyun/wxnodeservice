export default class Toolbar extends React.Component{
	opts = [
			{icon:'',text:'',fun:null,disable:false}
		]

	defaults = {
		toNext:{icon:50, text:'下一首播放'},
		toAlbum:{icon:49, text:'加到歌单'},
		collect:{icon:51, text:'收藏'},
		delete:{icon:52, text:'删除'},
		edit:{icon:54, text:'编辑'}
	}

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

	componentWillMount(){

	}

	componentWillUnmount(){

	}

	getVal(k,item){

		if(item.name=='collect'&&k=='icon'&&item.hasCollect)
			return 511;	// 已收藏

		return item[k] || this.defaults[item.name][k];
	}

	render(){

		var {show, list, events} = this.props,
			arr = [];

		if(list) {
			arr = list.map((item,i)=>{
				var {icon, text, fun, disable} = item;

				var event = fun || events[item.name];

				return(<li key={i} className={disable?'disable':''} onTouchEnd={disable?null:event}>
						<div className='icon_wrap'><img src={`../static/imgs/actionBar/pic-${this.getVal('icon', item)}@2x.png`}/></div>
						<div className='icon_name'>{this.getVal('text', item)}</div>
				</li>)
			})
		}
		return (<ul className={'action_bar '+ (show?'show':'hide')}>{arr}<div className='bg'></div></ul>)
	}
}
