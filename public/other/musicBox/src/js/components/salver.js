import {Actions} from '../actions/action';
import {PlayStatus} from '../libs/const';

export default class Slaver extends React.Component{
	
	playOrPause(playing){
		Actions.playOrPause(playing);
		this.setState({})
	}

	link(){
		location.hash=`#/player`;
	}

	render(){
		var {msi, name ,artist} = this.props.info;
		var playing = this.props.playStatus==PlayStatus.PLAY;

		return (<div className='salver'>
					<div className='img_wrap' onTouchTap={this.link}><img className={playing?'music_img':''} src={msi||'../static/imgs/pic-40@2x.png'}/></div>
					<div className='base_info' onTouchTap={this.link}>{name?(name+'-'+artist):'无歌曲'}</div>
					<div className='switch'>         
						<i className={playing?'start':'stop'} onTouchEnd={this.playOrPause.bind(this,playing)}>{}</i>
						{/*<i className='' onTouchEnd={this.next.bind(this)}>next</i>*/}
					</div>
					<div className='more' onTouchTap={this.props.showPlayList}><i></i></div>
		</div>)
	}
}
