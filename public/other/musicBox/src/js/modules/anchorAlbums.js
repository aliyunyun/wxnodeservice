import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';

var {Link} = ReactRouter;

export default class AnchorAlbums extends React.Component{

	state = {
		pager:{
			current_page:0,
			total_page:1
		},
		data:{
			albums:[]
		}
	}

	componentDidMount(){
		var self = this;

		document.title=this.props.params.title;

		this.myScroll = new IScroll('#wrapper',{probeType:3});
		this.myScroll.on("scroll",function(){
		    if(this.y<this.maxScrollY) this.loading = true;;
		    
		});
		this.myScroll.on("scrollEnd",function(){
		    if(this.loading){
		    	this.loading = false;
		    	self.getData.call(self);
		    }

		});

		this.getData();
	}

	getData(){
		var {current_page, total_page} = this.state.pager;

		if(total_page<=current_page) return;

		Ajax.getXmlyAnnoAblums({aid:this.props.params.id, page:current_page+1}, (data)=>{
			this.state.data.albums = this.state.data.albums.concat(data.albums);
			this.state.pager = {current_page:data.current_page, total_page:data.total_page};
			this.setState({});
			this.refreshScroll();
		})
	}


	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}


	render(){
		var {showMore} = this.state;

		return(
			<div className='page page_anchors'>

            	{/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                    <div className='scroller'>
                    	<Item list={this.state.data.albums} />
                    </div>
                </section>
            </div>
		)
	}
}


class Item extends React.Component{
	link(baseInfo){
		location.hash=`#/network/albums/${encodeURIComponent(JSON.stringify(baseInfo))}`;
	}

	render(){
		var {list} = this.props, html = [];

		html = list.map((item)=>{
			var playCount = item.play_count>10000 ? ((item.play_count/10000).toFixed(1)+'万') : item.play_count;
			var baseInfo = {
				id:item.id,
				title:item.album_title,
				playsCount:item.play_count,
				img:item.cover_url_middle,
				intro:item.album_info,
				artist:item.nickname
			}
			return (<li key={item.id} onTouchTap={this.link.bind(this,baseInfo)}>
				<div className='img_wrap'><img src={item.cover_url_small} /></div>
				<div className='base_info'>
					<p className='line1'>{item.album_title}</p>
					<p className='line2'>{item.album_intro}</p>
					<div className='line3'>
						<i className='playnum_icon'></i><span>{playCount}</span>
						<i className='num_icon'></i><span>{item.include_track_count}集</span>
					</div>
				</div>
				<div className='oper_icon'><i className='arrow_right'></i></div>
			</li>);
		})
		return (<ul className='category_list'>{html}</ul>);
	}
}