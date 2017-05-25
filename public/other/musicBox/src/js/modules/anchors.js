import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';


var {Link} = ReactRouter;

export default class Anchors extends React.Component{

	state = {
		pager:{
			current_page:0,
			total_page:1
		},
		data:{
			announcers:[]
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

    	Ajax.getXmlyCategoryAnnos({vcategory_id:this.props.params.id,calc_dimension:1,page:current_page+1}, (data)=>{
			this.state.data.announcers = this.state.data.announcers.concat(data.announcers);
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
                    	<Item list={this.state.data.announcers} />
                    </div>
                </section>
            </div>
		)
	}
}


class Item extends React.Component{
	link(id,title){
		location.hash=`#/network/anchorAlbums/${id}/${encodeURIComponent(title)}`;
	}

	render(){
		var {list} = this.props, html = [];



		html = list.map((item)=>{
			var followerCount = item.follower_count>10000 ? ((item.follower_count/10000).toFixed(1)+'万') : item.follower_count;

			return (<li key={item.id} onTouchTap={this.link.bind(this,item.id,item.nickname)}>
				<div className='img_wrap'><img src={item.avatar_url} /></div>
				<div className='base_info'>
					<p className='line1'>{item.nickname}</p>
					<p className='line2'>{item.vdesc||'暂无'}</p>
					<div className='line3'>
						<i className='playnum_icon'></i><span>{followerCount||0}</span>
						<i className='num_icon'></i><span>{item.released_track_count||0}集</span>
					</div>
				</div>
				<div className='oper_icon'><i className='arrow_right'></i></div>
			</li>);
		})
		return (<ul className='category_list'>{html}</ul>);
	}
}