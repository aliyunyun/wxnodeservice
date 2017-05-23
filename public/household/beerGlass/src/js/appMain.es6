import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Event} from './Event.es6';//活动
import {EventSet} from './EventSet.es6';//活动设置组件
import {GameList} from './GameList.es6';//啤酒杯主页
import {GameOn} from './GameOn.es6';//游戏开始
import {Ranking} from './Ranking.es6';//排行榜
import {Rule} from './Rule.es6';//规则
import {Punish} from './Punish.es6';//惩罚建议

var {Router, Route, hashHistory,IndexRedirect} = ReactRouter;

het.domReady(()=>{
    // het.post({
    //         url: Path.wPath+'/wechat/jssdk/sign',
    //         data: 'format=json&url='+encodeURIComponent(location.href.split('#')[0]),
    //         async:false,
    //         success: function(data,status,xhr){
    //             if(typeof data == 'string'){
    //                 data = JSON.parse(data);
    //             }
    //             var code = data.code;
    //             var jsonData = data.data;
    //             if(status == "success" && code == 0){   
    //                 wx.config({
    //                     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //                     appId: jsonData.appId, // 必填，公众号的唯一标识
    //                     timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
    //                     nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
    //                     signature: jsonData.signature,// 必填，签名，见附录1
    //                     jsApiList: ['scanQRCode','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //                 });     
    //                 sessionStorage.appid = jsonData.appId;          
    //                 // wx.ready(function(){ 
    //                 // });
    //                 // wx.error(function(res){
    //                 //  alert(res.errMsg);      
    //                 // });                  
    //             }       
    //         }
    //     });
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    render() {
        return <div className="app">{this.props.children}</div>;
    }
}

// 开始渲染
het.domReady(()=>{
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="gameList" />
                <Route path="event" component={Event} />
                <Route path="gameOn/:gameType" component={GameOn} />
                <Route path="gameList" component={GameList} />
                <Route path="eventSet/:activityType/:lightType/:winNum" component={EventSet} />
                <Route path="rank/:groupId" component={Ranking} />
                <Route path="rule" component={Rule} />
                <Route path="punish" component={Punish} />
           </Route>
        </Router>
    ), document.getElementById('ROOT'));
});