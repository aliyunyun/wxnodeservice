import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../libs/iscroll-probe';
import {Panel} from '../stores/store';

var {Link} = ReactRouter;

export default class Network extends React.Component{

	state = {
		pager:{
			current_page:0,
			total_page:1
		},
		currTag:'',
		list:[],
		showMore: false,
		panels:[]
	}

	componentDidMount(){
		var self = this;
		document.title=this.props.params.title;
		this.myScroll = new IScroll('#wrapper',{probeType:3});
		this.myScroll.on("scroll",function(){
		    if(this.y<this.maxScrollY) this.loading = true;
		    
		});
		this.myScroll.on("scrollEnd",function(){
		    if(this.loading){
		    	this.loading = false;
		    	self.getAlbums({subCategoryId:self.state.currTag,tag_name:self.state.currTag});
		    }

		});

		this.tagScroll = new IScroll('#tagWrap',{ scrollX: true,  scrollY: false});
		
		var cid = this.props.params.id;
		var currPanelItem;

		if(cid==99){	// 睡眠
			Ajax.getSubCategroyList({categoryId:1}, (res)=>{
				this.state.panels = res.data;
				currPanelItem = this.getPanelItem(Panel.getId('tags'),res.data);
				res.data.length&&this.getAlbums(currPanelItem);
				this.setState({});
				setTimeout(()=>{this.tagScroll.refresh()},0)
			})
		}else{
			Ajax.getXmlyCategoryTags({category_id:cid,type:0}, (data)=>{
				this.state.panels = data;
				currPanelItem = this.getPanelItem(Panel.getId('tags'),data);
				data.length&&this.getAlbums(currPanelItem);
				this.setState({});
				setTimeout(()=>{this.tagScroll.refresh()},0)
			})
		}
		
	}

	getPanelItem(tag, list){

		for(var i = 0; i < list.length; i++){
			if(tag==list[i].subCategoryId||tag==list[i].tag_name) return list[i];
		}
		return list[0];

	}

	getAlbums(item){
		var cid = this.props.params.id;

		if(this.state.currTag!=item.subCategoryId&&this.state.currTag!=item.tag_name){
			this.state.pager = {
				current_page:0,
				total_page:1,
			}
			this.state.list = [];
		}

		var {current_page, total_page} = this.state.pager;

		if(total_page<=current_page) return;

		Panel.setId('tags', item.subCategoryId||item.tag_name);

		if(cid==99){  // 睡眠
			Ajax.getXmlyAlbumsList({categoryId:1,type:1,subCategoryId:item.subCategoryId,pageIndex:current_page+1},(res)=>{
				var list = [];
				res.data.list.forEach((item)=>{
					list.push({
						id:item.id,
						include_track_count:item.tracksCount,
						play_count:item.playsCount,
						cover_url_small:item.coverUrlSmall,
						nickname:item.nickname,
						album_title:item.title
					})
				})
				this.state.pager = {current_page:current_page+1, total_page:res.data.pager.totalPages};
				this.state.list = this.state.list.concat(list);
				this.state.currTag = item.subCategoryId;
				this.setState({});
				this.refreshScroll();
			})
		}else{
			Ajax.getXmlyCategoryAlbums({
				category_id:cid, 
				tag_name:item.tag_name,
				calc_dimension:1,
				page:current_page+1
			},(data)=>{
				this.state.pager = {current_page:data.current_page, total_page:data.total_page};
				this.state.list = this.state.list.concat(data.albums);
				this.state.currTag = item.tag_name;
				this.setState({});
				this.refreshScroll();
			})
		}

		this.state.panels.forEach((item)=>{
			item.selected = false;
		})
		item.selected = true;
		this.setState({showMore:false})
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}

	toggle(){
		this.setState({showMore:!this.state.showMore})
	}

	render(){
		var {showMore} = this.state;
		var cid = this.props.params.id;

		return(
			<div className='page page_tags'>
                {/* 顶部固定区域 */}
            	<header className='header'>
            		<div className='panel'>
            			{<div className='tag_wrap' id='tagWrap' style={{display:showMore?'none':'block'}}>
            				<div style={{display:'inline-block', paddingRight:'3.333rem'}}>
	                    	{
	                    		this.state.panels.map((item,i)=>{
	                    			//if(i>3) return '';
	                    			var name = item.tag_name||item.subCategoryName;
	                    			return (<div className={'tag_item '+(this.state.currTag==name?'selected':'')}>
	                    					<span key={name} onTouchTap={this.getAlbums.bind(this,item)}>{name}</span>
	                    				</div>)
	                    		})
	                    	}
                    		</div>
                    	</div>}
                    	{showMore&&<span>更多分类</span>}
                    	<span className='more'>
                    		<i className={'arrow_bottom '+(showMore?'roate_top':'roate_bottom')} onTouchEnd={this.toggle.bind(this)}></i>
                    	</span>
                    </div>
            	</header>

            	{/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                    <div className='scroller'>
                    	<Item list={this.state.list} />
                    </div>
                    {showMore&&<MoreList list={this.state.panels} touchCallback={this.getAlbums.bind(this)}/>}
                </section>
            </div>
		)
	}
}
	

class Item extends React.Component{
	link(id, title, playsCount, tracksCount){
		location.hash=`#/network/albums/${id}/${encodeURIComponent(title)}/${playsCount}/${tracksCount}`;
	}

	render(){
		var {list} = this.props, html = [];
		if(!list) return <div></div>;

		html = list.map((item)=>{
			var playCount = item.play_count>10000 ? ((item.play_count/10000).toFixed(1)+'万') : item.play_count;
			
			return (<li key={item.id} onTouchTap={this.link.bind(this,item.id,item.album_title,item.play_count,item.include_track_count)}>
				<div className='img_wrap'><img src={item.cover_url_small} /></div>
				<div className='base_info'>
					<p className='line1'>{item.album_title}</p>
					<p className='line2'>by {item.nickname||item.announcer.nickname||''}</p>
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


class MoreList extends React.Component{

	render(){
		var {list} = this.props, 
			html = [], arr, num = 3;

		list.forEach((item, i)=>{
			i%num==0 && (arr=[]);

			arr.push(<li onTouchTap={this.props.touchCallback.bind(this,item)}>
					<span className={item.selected?'selected':''}>{item.tag_name||item.subCategoryName}</span>
				</li>)

			if(i%num==(num-1) || (i==list.length-1))
				html.push(<ul>{arr}</ul>);
		})

		return (<div className='more_list'>{html}</div>)
	}
}