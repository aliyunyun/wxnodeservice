import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SideInfo} from './SideInfo.es6';//侧边栏
import Alert from './Alert.es6';//弹框

export class GameList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSide:false,//显示侧边栏
            deviceUid:'fdfdfdf',//啤酒杯设备唯一标识
            gameType:'1'//参与中的游戏类型（本参数可为空，代表没有参与过任何游戏）
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        het.setTitle('啤酒杯');
        Actions.ajax('','/user/index');//用户参与游戏情况
    }
    showSide(e){
        this.setState({showSide:!this.state.showSide});
    }
    handleBind(state,fn){
        this.setState({isShowAlert:state.isShowAlert});
        if(state.sure){//添加设备
            Actions.bindDevice();
        }
    }
    enterGame(index){
        if(this.state.deviceUid){
            location.href = '#/gameOn/'+index;
        }else{
            this.setState({isShowAlert:true});
        }
    }
    render() {
        let gameName= ['真心话大冒险','谁是酒王'],
        showSide = this.state.showSide,
        message = '游戏需要先绑定设备哦，点击“添加设备”，扫描酒杯底部的二维码即可完成绑定。';

        return <div className='main'>
        <section className='gameList' style={{width:"100%",marginLeft:showSide?'70%':''}}>
            <div className='shadow' style={{display:showSide?'':'none'}} onTouchTap={this.showSide.bind(this)}></div>
            <p className='sidebar'><img src='../static/img/ic-sidebar.png' onTouchTap={this.showSide.bind(this)}/></p>
            <ul className='set-ul'>
            {
                gameName.map((item,index)=>{
                    return  <li key={index} onTouchTap={this.enterGame.bind(this,index+1)}>
                        <span>{item}</span>
                        <span><i>{this.state.gameType==index+1?'参与中':'创建游戏'}</i><img src='../static/img/ic-arrow.png'/></span>
                    </li> 
                })
            }
            </ul>
        </section>
        <SideInfo show={showSide} deviceUid={this.state.deviceUid?this.state.deviceUid:''}/>
        {this.state.isShowAlert ?<Alert isShowTitle={false} message={message} btnSure='添加设备' childSetState={this.handleBind.bind(this)}/>:''}
        </div>;
    }
}
