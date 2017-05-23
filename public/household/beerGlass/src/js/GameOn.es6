/**
 * 游戏主页
 * @props.params {int} gameType 游戏类型（真心话大冒险） 
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

export class GameOn extends BaseComponent {
    constructor(props) {
        super(props);
        var gameTitle = ['真心话大冒险','谁是酒王'];
        het.setTitle(gameTitle[props.params.gameType-1]);
        this.state = {
          lightType:'2',  //游戏组灯光模式
          groupOwner: 23,//群主用户id
          ownerNickName: "owen",//群主昵称
          isOwner: true,//是否是群主（true-是，false-不是）
          groupQRcode: "../static/img/aa.png",//游戏组二维码图片路径
          groupUrl: "http://localhost/group/add",//游戏组链接
          groupId:'1',//游戏组id
        };
        this.listenStore(Store); // 监听Store
    }
    showLight(e){
        this.setState({showLight:!this.state.showLight});
    }
    lightSelect(e){
      var index = e.target.getAttribute('data-index'),
      data={};
      data.groupId = this.state.groupId;
      data.lightType = index;
      Actions.ajax(data,'/gamegroup/set');//设置游戏组灯光模式
      this.setState({lightIndex:index});
    }
    shareFriend(e){
      let linkStr = this.state.groupUrl;
      Actions.shareFriend(linkStr);
    }
    componentDidMount(){
      let gameType = this.props.params.gameType,
      data ={};
      data.gameType = gameType;
      Actions.ajax(data,'/gamegroup/create');//创建游戏组
    }

    render() {
      let light = ['热情','温柔','欢快','互动'];
      return <section className='game'>
        <div className='qrcodeMain'>
          <div className='qrcodeImg'><img src={this.state.groupQRcode} alt=''/></div>
          <p>请让好友扫描二维码加入</p>
          <p onTouchTap={this.shareFriend.bind(this)}>发送链接给好友</p>
        </div>
        <ul className='set-ul'>
          <a href='#/rule'>
            <span>查看游戏规则</span>
            <span><img src='../static/img/ic-arrow.png'/></span>
          </a> 
          {
            this.state.isOwner?<li onTouchTap={this.showLight.bind(this)}>
              <span>设置灯光模式</span>
              <span><i>{light[this.state.lightIndex?this.state.lightIndex-1:1]}</i><img src='../static/img/ic-arrow.png'/></span>
            </li>
            :''
          }
        </ul>
        <a className='btn' href={'#/rank/'+this.state.groupId}>点击查看酒量排行</a>
        {
          this.state.showLight?
          <div>
              <div className="shadow" onTouchTap={this.showLight.bind(this)}></div>
              <ul className='mode-ul'>
              {
                  light.map((item,index)=>{
                      return <li key={index} data-index={index+1} onTouchTap={this.lightSelect.bind(this)}><span>{item}</span><img className={this.state.lightIndex==index+1?'':'hidden'} src='../static/img/ic-checked.png'/></li>
                  })
              }
              </ul>
          </div>
          :''
        }
      </section>;
    }
}
