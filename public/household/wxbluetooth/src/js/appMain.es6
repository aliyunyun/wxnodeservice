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
    let url = "http://a01e3c42.ngrok.io"+'/wechat/jssdk/sign';

    let path =  location.href.split('#')[0];

    console.log("path:  " + path);

    let data = {url:path};

    console.log("dom ready");

    het.post(
            url,
            data,
            function(data,status){

                console.log("success hahahah: " + JSON.stringify(data));
               // alert("success hahahah:"  + JSON.stringify(data));
                if(typeof data == 'string'){
                    data = JSON.parse(data);
                }true
                var code = data.code;
                var jsonData = data;
                console.log(typeof data,'typeof data');

                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: jsonData.appId, // 必填，公众号的唯一标识
                        timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
                        nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
                        signature: jsonData.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'ready',
                            'error',
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
                            'chooseImage',
                            'getLocation',

                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    sessionStorage.appid = jsonData.appId;
                    // wx.ready(function(){
                    // });
                    // wx.error(function(res){
                    //  alert(res.errMsg);

                    // });

               // }
            },
            function(msg){
                alert("req failed:"  + msg);
            }
        );
});



wx.ready(function () {
    alert("wx 先休息 ready");
    // 初始化设备库函数
    wx.invoke('openWXDeviceLib', { 'connType': 'blue'}, function (res) {
        console.log("openWXDeviceLib : " + JSON.stringify(res));
        alert("openWXDeviceLib " + + JSON.stringify(res));
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

       // alert("touchTap事件测试 ");

        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                console.log("getLocation:" + JSON.stringify(res));
            }
        });
    }
    handleTouchTap1(e) {
        console.log('touchTap事件测试');

        // alert("touchTap事件测试 ");

        //监听扫描未绑定设备返回数据
        wx.checkJsApi({
            jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

                console.log("checkJsApi res:" + JSON.stringify(res));

                wx.chooseImage({
                    success:function (res) {
                        alert('已选择 ' + res.localIds.length + ' 张图片');
                    }
                });
            }
        });


    }

    componentDidMount() {


    }
    render() {
        console.log("app render");

        return <div >

        <div onTouchTap={this.handleTouchTap.bind(this)}>点我1</div>

        <div onTouchTap={this.handleTouchTap1.bind(this)} style={{
            paddingTop: '30px'}}>点我2</div>
    </div>;
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