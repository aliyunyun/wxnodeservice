/**
 * 排行榜组件
 * @props.params {number} groupId 游戏组id
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import Alert from './Alert.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;
export class Ranking extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store); // 监听Store
    }
    showAlert(e){
      this.setState({isShowAlert:true});
    }
    gameOver(state,fn){
      this.setState(state);
      if(state.sure) {
        let data={};
        data.groupId =parseInt(this.props.params.groupId);
        Actions.ajax(data,'/gamegroup/dissolve');//结束游戏
      }
    }
    componentDidMount(){
      let groupId = parseInt(this.props.params.groupId),
      data={},
      groupQRcode = localStorage.getItem('groupId_'+groupId)?localStorage.getItem('groupId_'+groupId):'';
      data.groupId = groupId;
      if(groupQRcode) this.setState({groupQRcode:groupQRcode});
      Actions.ajax(data,'/gamegroup/drink/list');//获取排行榜
    }
    render() {
      let message = '确认要结束游戏？';
      let rankList = this.state.rankList?this.state.rankList:[],//排名信息
      owner = this.state.owner;//群主信息
      return <section className='rank'>
      <div className='borderBox borderShadow'>
        <div className='rank-header'>
          <ul>
            <li><span className='cl-gray'>游戏群主：</span><span>{owner?owner.ownerNickName:''}</span></li>
            <li><span className='cl-gray'>参与人数：</span><span>{rankList?rankList.length:''}</span></li>
          </ul>
          <img src={this.state.groupQRcode} alt='qrcode'/>
        </div>
      </div>
      <ul className='rank-ul'>
        <li className='flex cl-gray '>
          <span className='flex-cell'>排名</span>
          <span className='flex-cell'>昵称</span>
          <span className='flex-cell'>饮酒量</span>
        </li>
        {
          rankList.map((item,index)=>{
            return <li key={index} className='flex'>
              <span className='flex-cell'>{index+1}</span>
              <span className='flex-cell'>{item.nickName}</span>
              <span className='flex-cell'>{item.drinkCapacity+'ml'}</span>
            </li> 
          })
        }
         
      </ul>
      <footer className='flex'>
        <a className='flex-cell btn' href='#/punish'>惩罚建议</a>
        <span className='flex-cell btn' onTouchTap={this.showAlert.bind(this)}>结束游戏</span>
      </footer>
      {this.state.isShowAlert ?<Alert isShowTitle={false} message={message} btnSure='结束' childSetState={this.gameOver.bind(this)}/>:''}
      </section>;
    }
}
