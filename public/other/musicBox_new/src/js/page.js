import Salver from './components/salver';
import PlayList from './components/playList';


import {locStgStore, audio} from './stores/store';
import {Actions} from './actions/action';


export default class Page extends React.Component{
    state = {
        currInfo:{},
        list:[],
        internalInfo:null
    }

    hideFooterArr = ['player','newFile'];

    constructor(props) {
        super(props);
        this.removeListen = locStgStore.listen(this.setState.bind(this))
    }

    componentWillUnmount(){
        this.removeListen();
    }

    componentDidMount(){
        Actions.getList();

        var first = true;
        //this.timer = setInterval(()=>{
        	Actions.getDeviceData();
			
		//},1000)
    }

    showPlayList(){
        this.refs['playList'].toggle(true);
    }

    render() {

        var {currInfo, playing} = this.state;

        var showFooter = true;
        this.hideFooterArr.forEach((item,i)=>{
            if(location.hash.indexOf(item)!=-1) showFooter = false;
        })
        return (<div className='container'>
                    {React.cloneElement(this.props.children, _.extend({showPlayList:this.showPlayList.bind(this)},this.state))}

                    {showFooter&&<footer className='footer'>
                        <Salver info={currInfo} playing={playing} showPlayList={this.showPlayList.bind(this)} />
                    </footer>}

                    <PlayList list={this.state.list} currId={currInfo?currInfo.mid:-1} ref='playList'></PlayList>
        </div>);
    }
}