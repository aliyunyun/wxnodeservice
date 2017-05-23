// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    // het.config({
    //     debugMode: 'print', // 打印调试数据
    //     updateFlagMap: {
    //     }
    // });

    // 配置微信
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

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    handleTouchTap(e) {
        console.log('touchTap事件测试');
    }
    render() {
        return <div onTouchTap={this.handleTouchTap.bind(this)}>receive: {JSON.stringify(this.state)}</div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});