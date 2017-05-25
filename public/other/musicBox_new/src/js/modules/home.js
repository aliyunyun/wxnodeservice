import Tips from '../components/tips';
import Confirm from '../components/confirm';
import _ from '../plugins/loadsh';
var {Link} = ReactRouter;
import IScroll from '../libs/iscroll-probe';
import {Panel} from '../stores/store';

export default class Home extends React.Component{

	constructor(props){
		super(props);
		_.assign(this.opts, this.props);
	}

    componentDidMount(){
        document.title='音乐';
    }

	componentWillMount(){

	}

	componentWillUnmount(){
	}

    setDefaultPanel(name){
        Panel.setId(name);
    }

	render(){
		return (
            <div className='page page_home'>
                {/*<Navigate title='音乐' left={{type:'link', link:'/'}} right={{}}/>*/}
                <section className='main'>
                    <div className="wrapper" id="wrapper">
                        <div className="con">
                        	<div className='group1'>
                        		<div>
                                    <Link to='/albums'>
                                        <img src='../static/imgs/pic-33@2x.png' />
                                        <div>我的歌单</div>
                                    </Link>
                                </div>
                        		<div>
                                    <Link to='/collection'>
                                        <img src='../static/imgs/pic-34@2x.png' />
                                        <div>我的收藏</div>
                                    </Link>
                                </div>
                        		<div>
                                    <Link to='/recent'>
                                        <img src='../static/imgs/pic-35@2x.png' />
                                        <div>最近播放</div>
                                    </Link>
                                </div>
                        	</div>

                        	<div className='group3'>
                                <div>
                                    <Link to='/internal' onTouchTap={this.setDefaultPanel.bind(this,'internal')}>
                                        <div><img src='../static/imgs/pic-37@2x.png'/></div>
                                        <span>设备音乐</span>
                                    </Link>
                                </div>

                        		<div>     
	                        		<Link to='/network' onTouchTap={this.setDefaultPanel.bind(this,'network')}>
	                        			<div><img src='../static/imgs/pic-38@2x.png'/></div>
	                        			<span>喜马拉雅</span>
	                        		</Link>
                        		</div>

                        		<div>
	                        		<Link to='/localStation' onTouchTap={this.setDefaultPanel.bind(this,'localStation')}>
	                        			<div><img src='../static/imgs/pic-39@2x.png'/></div>
	                        			<span>本地电台</span>
	                        		</Link>
                        		</div>
                        	</div>
                        </div>
                    </div>
                </section>
            </div>
        )
	}
}