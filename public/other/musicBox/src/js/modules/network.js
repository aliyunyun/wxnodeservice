import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';
import {Panel} from '../libs/localStore';

export default class Network extends React.Component{

	panels = [
		{id:'1',text:'推荐'},
		{id:'2',text:'分类'},
		{id:'3',text:'主播'}
	]

	state = {
	}

	componentDidMount(){
		document.title='喜马拉雅';
		this.myScroll = new IScroll('#wrapper',{mouseWheel: true});
		var currPanelId = Panel.getId('network') || 1;
		this.getData(currPanelId);
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.myScroll.refresh();
		},0)
	}

	getData(id){
		Panel.setId('network',id);
		if(id==1){
			Ajax.getRecommAlbums((data)=>{
				this.setState({currPanelId: id, recommend:data});
				this.refreshScroll();
			})
		}else if(id==2){
			Ajax.getXmlyCategoryList({},(data)=>{
				var arr = [{id:99, kind:'category', cover_url_small:'../static/imgs/pic-76@2x.png', category_name:'助眠'}];
				arr = arr.concat(data);
				this.setState({currPanelId: id, category: arr})
				this.refreshScroll();
			})
		}else if(id==3){
			Ajax.getXmlyAnnoCateList({},(data)=>{
				this.setState({currPanelId: id, category: data})
				this.refreshScroll();
			})
		}
		
	}

	render(){
		var {currPanelId} = this.state;

		return (
            <div className='page page_network'>
                <header className='header'>
                	<div className='panel'>
                    	{this.panels.map((item,i)=>{
                    		return (<span key={item.id} onTouchTap={this.getData.bind(this,item.id)} className={this.state.currPanelId==item.id?'selected':''}>{item.text}</span>)
                    	})}
                    </div>
                </header>

                {/* 可滚动区域 */}
                <section className="wrapper" id="wrapper" >
                	<div className={'scroller '}>
                		{
                			(function(self){
                				if(currPanelId==1){
                					return self.state.recommend.map((item,i)=>{
                						return <Item key={i} opts={item} />;
                					})
                				}else{
                					return <Item2 list={self.state.category} type={currPanelId} />;
                				}
                			}(this))
                		}
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

	moreLink(type, recomId, title){
		if(type==1){
			Panel.setId('tags');
			location.hash=`#/network/tags/${recomId}/${encodeURIComponent(title)}`;
		}else if(type==2){
			location.hash=`#/network/anchors/${recomId}/${encodeURIComponent(title)}`;
		}
	}

	render(){
		var {type, name, recomId, albumsList} = this.props.opts;
		return (<div className='nw_box'>
			<div className='header'><span>{name}</span><span className='more' onTouchTap={this.moreLink.bind(this, type, recomId, name)}>更多></span></div>
			<ul className=''>
				{albumsList&&albumsList.map((item,i)=>{
					var baseInfo = {
						id:item.id,
						title:item.title,
						playsCount:item.playsCount,
						img:item.coverUrlMiddle,
						intro:item.intro,
						artist:item.nickname
					}
					return (<li className='item' key={item.id}>
						<div onTouchTap={this.link.bind(this, baseInfo)}>
							<img src={item.coverUrlSmall}/><br/>
							<span>{item.title}</span>
						</div>
					</li>)
				})}
			</ul>
		</div>)
	}
}

class Item2 extends React.Component{

	link(id, name, type){
		if(type==2){		// 分类
			Panel.setId('tags');
			location.hash=`#/network/tags/${id}/${encodeURIComponent(name)}`;
		}else if(type==3){	// 主播
			location.hash=`#/network/anchors/${id}/${encodeURIComponent(name)}`;
		}
	}

	render(){
		var {list, type} = this.props, html = [], arr = [];

		list&&list.forEach((item,i)=>{
			var name = item[item.kind+'_name'];
			i%2==0 && (arr=[]);
			arr.push(<li onTouchTap={this.link.bind(this, item.id, name, type)} key={item.id}>
						{type==2&&<img src={item.cover_url_small} />}
						{name}
					</li>)

			if(i%2==0){
				if(i==list.length-1) html.push(<ul>{arr}</ul>)
			}else{
				html.push(<ul>{arr}</ul>)
			}
		})

		return (<div className={'category '+(type==3?'text_center':'')}>{html}</div>)
	}
}