import {locStgStore} from './stores/store';
import Toolbar from './components/toolbar';
import Tips from './components/tips';
import Confirm from './components/confirm';
import AlbumsPop from './components/albumsPop';
import {Collects,audio} from './stores/store';
import Ajax from './libs/ajax';

export default class BaseModule extends React.Component{
	scroll = null

	pageSize = 128

	selects = null

	state = {
		status:'single',	// 单选、多选
		confirm:{			// 确认框
			show:false,
			content:''
		},
		songs:{				
			list:[],		// 歌曲列表
			showToolbar:this.showToolbar.bind(this),
			playSong:this.playSong.bind(this),
			type:'default'
		},
		showDim:false,		// 是否显示阴影遮罩
		
		bSelectAll:false,	// 是否全选
		toolbar:{},
		albumsPop:{}
	}

	constructor(props){
		super(props);
	}

	/* 当滚动内容区域尺寸变化后需要重新计算 */
	refreshScroll(){
		setTimeout(()=>{
			this.scroll.refresh();
		},0)
	}

	/* 判断是否空对象 */
	isEmptyObject(o) {  
	    for (var k in o)  
	        return !1;  
	    return !0  
	}  


	/* 重置所有状态 */
	reset(){
		var {albumsPop} = this.state;
		this.state.showDim = false;
		if(!this.isEmptyObject(albumsPop))
			albumsPop.show = false;
		this.cancelMulti();
		this.setState({});
	}

	// 取消多选
	cancelMulti(){
		this.state.status = 'single';
		this.state.toolbar.show = false;
	
		this.refreshScroll();
	}

	/* 获取选中的列表项 */
	getSelectes(){
		if(this.state.toolType=='all') return this.state.songs.list;

		if(this.state.status=='single') return [this.selects];

		return this.refs.songList.getSelectedItems(); 
	}

	setMulitTools(){
		this.state.toolType = 'mulit';
		this.state.toolbar.tools = [
			{name:'toNext', text:'添加到播放'},
			{name:'toAlbum'},
			{name:'collect'},
			{name:'delete'}
		]
	}

	setSimpleTools(item){
		this.state.toolType = 'single';
		this.state.toolbar.tools = [
			{name:'toNext'},
			{name:'toAlbum'},
			{name:'collect', hasCollect:Collects.has(item)},
			{name:'delete'}
		]
	}



	toolEvent(){
		var self = this;

		return {
			/* 下一首播放 */
			toNext(){
				var items = self.getSelectes();
				self.refs.tips.showMsg('已加入下一首播放');
				locStgStore.addToNext(items);
				self.reset();
			},

			/* 加到歌单 */
			toAlbum(){
				var items = self.getSelectes();
				self.state.showDim = true;
				self.setState({
					albumsPop:{
						musics:items,
						show:true,
						callBack(res){
							if(res.code!=0) 
								return self.refs.tips.showMsg('添加失败');
							self.refs.tips.showMsg('添加成功');
							self.state.albumsPop.show = false;
							self.reset();
						}
					}
				})
			},

			/* 收藏歌曲 */
			collect(){
				var items = self.getSelectes(),
					musicList = [];
				
				items.forEach((item)=>{
					musicList.push({
						musicId:item.mid,
						sourceType:item.sourceType
					})
				})

				if(self.state.toolType=='single'&&Collects.has(items[0])){
					Ajax.deleteMusicFromCustomAlbum({musicList:musicList},(res)=>{
						if(res.code==0){
							Collects.remove(items)
							self.refs.tips.showMsg('取消收藏');
						}
					})
				}else{
					Ajax.addMusicsToCustomAlbum({musicList:musicList},(res)=>{
						if(res.code==0){
							Collects.add(items)
							self.refs.tips.showMsg('收藏成功');
						}
					})
				}

				self.reset();
			},

			/* 确定要删除吗？*/
			delete(confirm, cancel){
				var items = self.getSelectes();
				self.setState({confirm:{
					show:true,
					content:'确定要删除吗？',
					onCancel(){
						self.setState({confirm:{show:false}})
						cancel();
					},
					onConfirm(){
						confirm(items);
					}
				}})
			}
		}
	}

	/* 点击歌曲事件 */
	showToolbar(item){
		this.selects = item;
		this.state.showDim = true;
		this.state.toolbar.show = true;
		this.setSimpleTools(item);
		this.setState({});
	}

	playSong(item){
		this.selects = item;
		locStgStore.play(item);
	}

	/* 点击多选事件 */
	onMultiSelect(){
		this.setMulitTools();
		this.state.status = 'multi';
		this.state.toolbar.show = true;

		this.onSelectAll(false);

		this.refreshScroll();
		this.setState({});
	}

	/* 取消多选事件 */
	onCancelMulti(){
		this.cancelMulti();
		this.setState({});
	}

	onTouchDim(){
		this.reset();
		this.setState({});
	}

	onPlayAll(){
		var {list} = this.state.songs;
		if(list&&list.length){
			locStgStore.clear();
			locStgStore.addToNext(list);
			locStgStore.play(list[0]);
		}
	}

	onSelectAll(flag){
		this.refs.songList.selectAll(flag);
		this.setState({bSelectAll:flag})
	}



	getMulitBar(){
		var {status, bSelectAll} = this.state;

		if(status=='single'){
			return	(<div className='multi_bar'>
						<div className='left'>
							<span className='ver_mid' onTouchTap={this.onPlayAll.bind(this)}>
								<i></i><span>播放全部歌曲</span>
							</span>
						</div>
						<div className='right'>
							<span className='ver_mid' onTouchEnd={this.onMultiSelect.bind(this)}>
								<i></i><span>多选</span>
							</span>
						</div>
					</div>)
		}else{
			return	(<div className='multi_bar'>
						<div className='left'>
							<span onTouchTap={this.onSelectAll.bind(this,!bSelectAll)}>
								<i className={'multi_select '+(bSelectAll?'checked':'unchecked')}></i><span>多选</span>
							</span>
						</div>
						<div className='right'>
							<span className='ver_mid' onTouchEnd={this.onCancelMulti.bind(this)}>
								<span>取消</span>
							</span>
						</div>
					</div>)
		}
	}

	getDoms(){
		var {albumsPop, toolbar} = this.state;
		return [
			<div key='1' onTouchEnd={this.onTouchDim.bind(this)} className={'dim '+(this.state.showDim?'show':'hide')}></div>,
            toolbar.tools&&<Toolbar key='2' show={toolbar.show} list={toolbar.tools} events={toolbar.events}></Toolbar>,
            this.state.confirm.show&&<Confirm key='3' opts={this.state.confirm}></Confirm>,
            <Tips key='4' ref='tips' tip={this.state.tip}/>,
            !this.isEmptyObject(albumsPop)&&<AlbumsPop key='5' opts={albumsPop} sourceType='1'></AlbumsPop>
		]
	}
}