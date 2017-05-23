import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Toast} from './toast.es6';

export class Event extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showToast:false,
        };
        het.setTitle('活动');
        this.listenStore(Store); // 监听Store
    }
    handleStart(type){
        // console.log(type);
        let data ={};
        data.activityType = parseInt(type);
        Actions.ajax(data,"/activity/start");
    }
    componentDidMount(){
        Actions.ajax('','/activity/get');//获取活动详情
    }
    render() {
        // console.log(this.state)
        let eventInfo = this.state.eventInfo?this.state.eventInfo:[],//活动详情信息
        eventName = ['官方活动','幸运抽奖'];

        return <section className='event'>
            <ul className='eventlist'>
            {
                eventInfo.map((event,index)=>{
                    let lightType = event.lightType?event.lightType:0,
                    winNum = event.winNum?event.winNum:0,
                    seted = lightType && winNum;
                    return <li key={index}>
                        <p>{eventName[index]}</p>
                        <p className='flex '>
                            <span className='flex-cell' onTouchTap={this.handleStart.bind(this,index+1)} style={{background:seted?'#1A9964':'#c6c6c6',pointerEvents: seted?'auto':'none'}} >启动</span>
                            <Link  className='flex-cell' to={"/eventSet/"+event.activityType+"/"+lightType+'/'+winNum}>设置</Link>
                        </p>
                    </li> 
                })
            }
            </ul>
            <Toast show={this.state.toastShow} tips={this.state.tips}/>
        </section>;
    }
}
