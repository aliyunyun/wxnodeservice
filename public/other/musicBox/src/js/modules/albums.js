import Tips from '../components/tips';
import Confirm from '../components/confirm';

import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';
var {Link} = ReactRouter;

export default class Songs extends React.Component{

	state = {
		list:[]
	}

	componentDidMount(){
		document.title='我的歌单';
		this.myScroll = new IScroll('#wrapper');
		Ajax.getCustomAlbums((data)=>{
			this.setState({list:data});
			this.refreshScroll();
		})
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}

	/* 点击歌单列表 */
	onTouchItem(item){
		location.hash='#/albums/songs/'+item.album_id+'/'+encodeURIComponent(item.title)+'/'+encodeURIComponent(item.cover_url_small);
	}

	render(){
		var {list} = this.state;

		var count = 0;
		list&&list.forEach((item)=>{
			count+=(item.tracks_count||0);
		})
		return (
            <div className='page play_list'>
                <header className='header'>
                	<span>共{count}首歌</span><Link to='albums/build/0/0' className='add'><i>+</i>添加</Link>
                </header>

                <section className='wrapper' id='wrapper'>
                    <div className='scroller'>
                    	<FileList list={this.state.list} touchCallback={this.onTouchItem.bind(this)}/>
                    </div>
                </section>

            </div>
        )
	}
}

class FileList extends React.Component{
	render(){
		var list = this.props.list.map((item,i)=>{
			return <Item key={i} info={item} touchCallback={this.props.touchCallback}/>
		})

		return <ul className='file_list'>{list}</ul>
	}
}

class Item extends React.Component{
	render(){
		var {info, touchCallback} = this.props;

		return (<li onTouchTap={touchCallback.bind(null,info)}>
			<div className='img'><img src={info.cover_url_small}></img></div>
			<div className='base_info'>
				<div className='title'>{info.title}</div>
				<div className='num'>{info.tracks_count}首</div>
			</div>
			<div className='oper_icon'><i></i></div>
		</li>)
	}
}