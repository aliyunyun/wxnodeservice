import Salver from './components/salver';
import PlayList from './components/playList';
import BlueToothTip from './components/blueToothTip';

import {Store} from './stores/store';
import {blueToothTip} from './libs/localStore';
import {Actions} from './actions/action';


export default class Page extends React.Component{
    state = {
        currInfo:{},
        list:[],
        playMode:0,
        playSource:0,
        playStatus:0,
        internalInfo:null,
        showBTTip:true
    }

    hideFooterArr = ['player','newFile'];

    constructor(props) {
        super(props);
        this.removeListen = Store.listen(this.setState.bind(this));
    }

    componentWillMount(){
    	if(blueToothTip.isHide) this.state.showBTTip = false;
    }

    componentWillUnmount(){
        this.removeListen();
        clearInterval(this.timer);
    }

    componentDidMount(){
        Actions.getList();

        Actions.getDeviceData();
        this.timer = setInterval(()=>{
        	Actions.getDeviceData();
		},5000)
    }

    showPlayList(){
        this.refs['playList'].toggle(true);
    }

    cancel(){
    	this.setState({showBTTip:false})
    }

    confirm(neverShow){
    	neverShow&&blueToothTip.hide();
    	this.setState({showBTTip:false})
    }

    render() {

        var {currInfo, playStatus, playSource, showBTTip} = this.state;

        var showFooter = true;
        this.hideFooterArr.forEach((item,i)=>{
            if(location.hash.indexOf(item)!=-1) showFooter = false;
        })
        return (<div className='container'>
                    {React.cloneElement(this.props.children, _.extend({showPlayList:this.showPlayList.bind(this)},this.state))}

                    {showFooter&&<footer className='footer'>
                        <Salver info={currInfo} playStatus={playStatus} showPlayList={this.showPlayList.bind(this)} />
                    </footer>}

                    <PlayList list={this.state.list} playSource={playSource} currId={currInfo?currInfo.mid:-1} ref='playList'></PlayList>

                    {showBTTip&&<BlueToothTip onCancel={this.cancel.bind(this)} onConfirm={this.confirm.bind(this)}></BlueToothTip>}
        </div>);
    }
}