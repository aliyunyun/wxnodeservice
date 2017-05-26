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
    let url = "http://4690782d.ngrok.io"+'/wechat/jssdk/sign';
    let data =  location.href.split('#')[0];

    console.log("dom ready");
    alert("het dom ready");

    het.post(
            url,
            data,
            function(data,status){

                //console.log("success hahahah: " + data);
                alert("success hahahah:"  + data +  " status:" + status);
                if(typeof data == 'string'){
                    data = JSON.parse(data);
                }
                var code = data.code;
                var jsonData = data.data;
                if(status == "success" && code == 0){
                    alert("success hahahah: 2"  + status);
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: jsonData.appId, // 必填，公众号的唯一标识
                        timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
                        nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
                        signature: jsonData.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'openWXDeviceLib',
                            'onMenuShareAppMessage',
                            'getWXDeviceInfos',
                            'sendDataToWXDevice',
                            'startScanWXDevice',
                            'stopScanWXDevice',
                            'connectWXDevice',
                            'disconnectWXDevice',
                            'getWXDeviceTicket',
                            'onWXDeviceBindStateChange',
                            'onWXDeviceStateChange',
                            'onReceiveDataFromWXDevice',
                            'onScanWXDeviceResult',
                            'onWXDeviceBluetoothStateChange',

                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    sessionStorage.appid = jsonData.appId;
                    // wx.ready(function(){
                    // });
                    // wx.error(function(res){
                    //  alert(res.errMsg);
                    // });
                }
            },
            function(msg){
                alert("req failed:"  + msg);
            }
        );
});

wx.ready(function () {

    alert("wx ready");
// 初始化设备库函数
    wx.invoke('openWXDeviceLib', { 'connType': 'blue'}, function (res) {
        console.log("openWXDeviceLib : " + JSON.stringify(res));
        alert("openWXDeviceLib " + + JSON.stringify(res));
    });

    //监听扫描未绑定设备返回数据
    wx.on('onScanWXDeviceResult', function(argv){
        alert("ALL:"+JSON.stringify(argv));

    });
});

//微信系统错误
wx.error(function(res){
    alert("微信错误:"+JSON.stringify(res));
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

        alert("touchTap事件测试 ");
    }
    render() {
        console.log("app render");
        alert("app render");

        return <div onTouchTap={this.handleTouchTap.bind(this)}> 欢迎来到小俏蓝牙的控制界面 --- react。</div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('小俏蓝牙');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});