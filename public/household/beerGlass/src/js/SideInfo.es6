/**侧边栏用户信息
 * @props {string} deviceUid 啤酒杯设备id
 */

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import Alert from './Alert.es6';

export class SideInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowAlert:false,
        };
        this.listenStore(Store); // 监听Store
    }
    handleBind(e){
        let deviceMac = this.props.deviceUid;
        if(deviceMac){
            this.setState({isShowAlert:true})
        }else{//调起扫一扫 并绑定
            Actions.bindDevice();
        }
    }
    unbind(state,fn){
        this.setState({isShowAlert:state.isShowAlert});
        if(state.sure){//解绑 
            console.log('jiebang')
            Actions.ajax('','/unbind');
        }
    }         
    render() {
        let deviceMac = this.props.deviceUid?this.props.deviceUid:'',
        message = '解绑设备后，您将不能参与游戏，确认要解绑吗';
        
        return <section className='user-info' style={{display:this.props.show?'':"none"}}>
            <div className='header'><img src={this.props.headImgUrl} alt='头像'/><p>{this.props.nickName}</p></div>
            <ul className='info-ul'>
                <li onTouchTap={this.handleBind.bind(this)}>
                    <img style={{top:deviceMac?'27px':'18px'}} src='../static/img/ic-device.png' alt='设备'/>
                    <div>
                        <p>我的设备</p>
                        <p>{deviceMac}</p>
                    </div>
                    <span className={deviceMac?'cl-red':'cl-gray'}>{deviceMac?'解绑设备':'暂未绑定设备'}</span>
                </li> 
            </ul>
            {this.state.isShowAlert ?<Alert isShowTitle={false} message={message} btnSure='解绑' childSetState={this.unbind.bind(this)}/>:''}
        </section>;
    }
}