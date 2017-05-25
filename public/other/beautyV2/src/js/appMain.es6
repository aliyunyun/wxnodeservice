// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }
    componentWillMount() {
        let url = window.location.href;
        let search = url.substring(url.lastIndexOf("?") + 1);
        let obj = {};
        let reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, function (rs, $1, $2) {
            let name = decodeURIComponent($1);
            let val = decodeURIComponent($2);
            val = String(val);
            obj[name] = val;
            return rs;
        });
        let newsId = Number(obj.newsId);
        let appType = navigator.userAgent.indexOf('Android')>-1?3:4;
        let getUrl = "/v1/app/chairdressing/news/details?appId=10101&newsId="+newsId+"&appType="+appType+"&timestamp="+new Date().getTime();
        Actions.getData(getUrl);
    }
    componentDidUpdate(){
        if(this.state.title){
            het.setTitle(this.state.title);
        }
        if(this.state.content){
            document.querySelector('#articleContent').innerHTML = this.state.content;
        }
    }
    formatDate(date, format, isUTC){
        let timezoneOffset = 0;
        let dateObj = new Date(date);
        let patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/;
        let dateArr;
        let now = new Date();
        // IOS 解析失败时尝试手动解析
        if (dateObj.toString() === 'Invalid Date' && typeof date === 'string') {
            dateArr = date.match(patt) || [];
            dateObj = new Date(
                dateArr[1] || now.getFullYear(),
                (dateArr[2]-1) || now.getMonth(),
                dateArr[3] || now.getDate(),
                dateArr[4] || now.getHours(),
                dateArr[5] || now.getMinutes(),
                dateArr[6] || now.getSeconds()
            );
        }
        format = format || 'yyyy-MM-dd hh:mm:ss';
        if (isUTC) { // 处理utc时间
            timezoneOffset = (new Date()).getTimezoneOffset();
            dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);
        }
        let map = {
            'M': dateObj.getMonth() + 1, //月份 
            'd': dateObj.getDate(), //日 
            'h': dateObj.getHours(), //小时 
            'm': dateObj.getMinutes(), //分 
            's': dateObj.getSeconds(), //秒 
            'q': Math.floor((dateObj.getMonth() + 3) / 3), //季度 
            'S': dateObj.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            let v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            } else if(t === 'y') {
                return (dateObj.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }
    render() {
        let tags = this.state.tags || [];
        return (
            <div className='app-body'>
                <header>
                    {this.state.title || ""}
                </header>
                <section className='labelNav'>
                    {tags.map((item,index)=>{
                        let first = index==0?'firstLabel':'';
                        return(
                            <label className={'labelName '+first} key={index}>{'#'+item.tagName}</label>
                        )
                    })}
                </section>
                <section className='articleDate'>
                    {this.state.addTime?this.formatDate(this.state.addTime,"yyyy/M/d hh:mm:ss"):''}
                </section>
                <section className='articleContent' id='articleContent'>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    //het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={App} />
    //     </Router>
    // ), document.getElementById('ROOT'));
});