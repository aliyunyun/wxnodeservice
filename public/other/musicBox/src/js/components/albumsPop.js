import Tips from './tips';
import _ from '../plugins/loadsh';
import Ajax from '../libs/ajax';
import IScroll from '../plugins/iscroll-probe';


/*
	添加歌曲到专辑的弹出层组件
	props	
		opts:{
			musics: 	要添加的歌曲列表
			show: 		是否显示
			callback: 	添加成功后的回调
		}
*/
export default class AlbumsPop extends React.Component{

	state = {
		list:[]		// 自定义专辑列表
	}

	componentDidMount(){
		this.myScroll = new IScroll('#wrapper2');
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
	onTouchItem(albums){
		var data = {musicList:[]},
			{musics, sourceType, callBack} = this.props.opts;

		musics.forEach((item)=>{
			var obj = {
				albumsCustomId: albums.album_id,
				musicId: item.mid,
				sourceType: item.sourceType||this.props.sourceType
			}
			
			if(sourceType==3){
				obj.name = item.name;
				obj.imageUrlSmall = item.imageUrlSmall;
				obj.imageUrlMiddle = item.imageUrlMiddle;
				obj.imageUrlLarge = item.imageUrlLarge;
				obj.totalTime = item.totalTime;
				obj.uri = item.uri;
				obj.playUrl64 = item.playUrl64;
				obj.createTime = item.createTime;
			}

			data.musicList.push(obj);
		})

		Ajax.addMusicsToCustomAlbum(data, (data)=>{
			callBack(data);
		});
	}

	render(){
		var {musics, show} = this.props.opts;

		return (
            <div className={'custom_albums '+(show?"show":"hide")}>
                {musics&&musics.length==1&&<header className='header2'>
                	<div className='title'>{musics[0].name}</div>
                	<div className='nickname'>{musics[0].nickname||musics[0].artist}</div>
                </header>}

                <section className='wrapper2' id='wrapper2'>
                    <div className='scroller2'>
                    	<ul className='file_list'>
                    		{this.state.list.map((item,i)=>{
                    			return <Item key={item.album_id} info={item} touchCallback={this.onTouchItem.bind(this)} />
                    		})}
                    	</ul>
                    </div>
                </section>

            </div>
        )
	}
}

class Item extends React.Component{
	render(){
		var {info, touchCallback} = this.props;

		return (<li onTouchTap={touchCallback.bind(null,info)}>
			<div className='img'><img src={info.cover_url_small}></img></div>
			<div className='base_info'>
				<div>{info.title}</div>
				<div className='num'>{info.tracks_count}首</div>
			</div>
			<div className='oper_icon'><i></i></div>
		</li>)
	}
}