// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {CircleWave} from './CircleWave.jsx';
import {Wave} from './Wave.jsx';
import {TimeSelect} from './TimeSelect.jsx';
import {AirStatePage} from './AirStatePage.jsx';
import {DirtView} from './DirtView.jsx';
import {WeatherForecast} from './WeatherForecast.jsx';
import {EmitterCSSAnimation} from './EmitterCSSAnimation.jsx';
import {YYEmitterCSSAnimation} from './YYEmitterCSSAnimation.jsx';
import {YYImageAnimation} from './YYImageAnimation.jsx';

import {getFilterHistory, getWeatherForeCast,getSevenDayWeatherForeCastCacheData,getCity} from './RequestAction.jsx';

var {Router, Route, hashHistory} = ReactRouter;

let WorkModeArray = ['待机','自动', '低速', '中速','高速','睡眠','取消睡眠'];
let airStatusStrArray = ["good","fine","bad"];

let pointColor = ["rgba(255, 255, 255,1)","rgba(2247, 228, 123,1)", "rgba(255, 134, 134,1)"];
let fixedTim = {
    statusshow:false,
    minhour:1,
    maxhour:8,
    defaulthour:'1',
    hourarray:['1','2','3','4','5','6','7','8'],
    title:'',
    hourunit:"小时",
    hourshow:false
};
let isFixdTime = true;

let count = 0;
var thirtyDays = [];
var requestThirtyDays = [];
let daySelect = {
    statusshow:false,
    minhour:1,
    maxhour:30,
    defaulthour:'',
    hourarray:[],
    title:'',
    hourunit:"",
    hourshow:false
};

let hasShowErrorAlert = false;
let airInfoPercent = "18%";

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

let hasFirstRequesthistoryData = false;
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {

        },
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

let halfScreenWidth = 140;
// 创建React组件
class App extends BaseComponent {

    constructor(props) {
        super(props);

        this.listenStore(Store); // 监听Store
        halfScreenWidth = window.screen.width * 0.55;
        airInfoPercent = (halfScreenWidth - 144 + 24)/2;
       // console.log("airInfoPercent: " + airInfoPercent);

        this.getOneMonthDay();
        daySelect.defaulthour = thirtyDays[0];
        daySelect.hourarray = thirtyDays;

        this.state = {
            selectshow: false,
            airInfoPage:false,
            oneDayOnMonthSelect:thirtyDays[0],
            oneDayOnMonthSelectRequest:requestThirtyDays[0],
            sevenWeatherForecast:{},
            historyOneDayData:[],
            enableBackAnimation:true,
            filterTimePercentMode:true,
        };

        //console.log(thirtyDays);
    }

    getHistoryDataByDateString(dateStr, type, successfuncitoncb, errorfunctioncb){

        //console.log("getHistoryDataByDateString 0");
        let _this = this;
        let successCB = function (data) {
           // console.log("historyData:" + JSON.stringify(data));
            if(data && data.length > 0){
                let historyDataArray = [];
                data.map(function (oneDayPMValue) {
                    let pm25value = oneDayPMValue["pm25Value"] || 0;
                    historyDataArray.push(pm25value);
                });
                _this.setState({
                    historyOneDayData:historyDataArray,
                });
            }
            if(typeof  successfuncitoncb === "function"){
                successfuncitoncb(data);
            }
        };
        let errorCB = function () {

            if(typeof  errorfunctioncb === "function" ){
                errorfunctioncb();
            }

        };
        getFilterHistory(dateStr,type,successCB,errorCB);

    }

    componentWillMount(){

        het.setTitle(JSON.stringify({
            setNavTitle:0,
            setNavRightBtnHiden:0
        }))
    }

    componentDidMount() {
       console.log(" appmain componentDidMount");

       let _this = this;
      setTimeout(function () {

          if(!hasFirstRequesthistoryData){
              let successcb = function (data) {
                  hasFirstRequesthistoryData = true;
              };
              let errorcb = function () {
                  hasFirstRequesthistoryData = false;
              };
             // console.log("i request histoyr 1");
              _this.getHistoryDataByDateString(requestThirtyDays[0],0,successcb, errorcb);
              hasFirstRequesthistoryData = true;
          }

      },3010);

        if(getSevenDayWeatherForeCastCacheData() == null){
            setTimeout(function() {
                getWeatherForeCast();
            },3000);
        }
    }

    getOneMonthDay(){
        let now = new Date();
        let currentDay = now.getDate();
        for(let i = 0 ; i < 30; i++){
            let newDAY = new Date();
            let nextNow = newDAY.setDate(currentDay - i);
            let nextDay = new Date(nextNow);
            let year = nextDay.getFullYear();
            let month = nextDay.getMonth();
            let day = nextDay.getDate();
            let str2 = year + "年"+ (month+1) + "月"+ day + "日";

            let requestTime = nextDay.Format("yyyy-MM-dd");
            // let requestTime = year  + "-"+ (month+1) + "-"+ day ;
            thirtyDays.push(str2);
            requestThirtyDays.push(requestTime);
        }
    }

    childLockAction(){
        let currentChildValue = this.state.ChildLockState || 1;
        Actions.setChildLockAction(currentChildValue);
    }

    switchAction(){
        let currentChildValue = this.state.WorkModeValue || 1;
        Actions.setSwitchStateAction(currentChildValue);
    }

    autoModeAction(){
        let currentModeIndex = this.state.WorkModeValue || 2;
        Actions.setMondeAction(currentModeIndex);

    }

    alarmColokAction(){

        if(this.checkChildLodkAction()){ console.log("童锁打开了"); return;}
        if(this.checkNetWorkLockedAction()){ console.log("没有网了"); return;}
        if(this.checkPowerOnAction()){console.log("没有开机"); return;}

        isFixdTime = true;
        this.setState({
            selectshow: !this.state.selectshow,
            enableBackAnimation:!this.state.enableBackAnimation,
        });

    }

    anionModeAction(){

         let currentSate = this.state.IonizerState;
        Actions.setIonizerAction(currentSate);

    }

    ultravioletLampAction(){
         let currentSate = this.state.UvState;
        Actions.setUvAction(currentSate);
    }

    cancelClock(){

        if(isFixdTime){
            this.setState({
                selectshow: false,
                enableBackAnimation:true,
            });
        }else{
            this.setState({
                selectshow: false,
                enableBackAnimation:false,
            });
        }
    }

    submitClock(selectHourValue){

        //console.log("submitTime: " + selectHourValue) ;
        if(isFixdTime){
            let hourValue = selectHourValue ;
            if(hourValue < 9 && hourValue > 0){
                //console.log("submitTime: " + selectHourValue) ;
                Actions.setTimeClock(hourValue);
            }
            fixedTim.defaulthour = selectHourValue;
        }else{
            //console.log("getHistoryDataByDateString 0000value:" + selectHourValue);
            let timeDayValue = selectHourValue ;
            let indexInArray = thirtyDays.indexOf(selectHourValue);
            this.setState({
                oneDayOnMonthSelect:timeDayValue,
                oneDayOnMonthSelectRequest:indexInArray
            });
            daySelect.defaulthour = timeDayValue;
            count++;
           // console.log("getHistoryDataByDateString 0000:" + indexInArray + " count:" + count);
            if(indexInArray == 0){
               // console.log("getHistoryDataByDateString 0000");
                this.getHistoryDataByDateString(requestThirtyDays[0],0,null, null);
            }else{
                this.getHistoryDataByDateString(requestThirtyDays[indexInArray], 1, null, null);
            }
        }


        if(isFixdTime){
            this.setState({
                selectshow: false,
                enableBackAnimation:true,
            });
        }else{
            this.setState({
                selectshow: false,
                enableBackAnimation:false,
            });
        }

    }

    selectOneDay(){
        this.setState({
            selectshow: true,
        });
        isFixdTime = false;
    }

    checkChildLodkAction(){
        let childLock = (this.state.ChildLockState || 1) == 2;  // == 2表示童锁打开
        return childLock ;
    }

    checkNetWorkLockedAction(){
        let netWorkState = this.state.onLinestatue  ;  // true 表示有网
        return !netWorkState;
    }

    switchToWeather(){
        if(getCity()){
            window.location.href = '#/forcast';
        }

    }

    checkPowerOnAction(){

        let workModeIndex = this.state.WorkModeValue || 1;
        return workModeIndex == 1; // ===1 表示待机中
    }

    switchToPMValueHistoryView(){
        this.setState({
            airInfoPage: !this.state.airInfoPage,
            enableBackAnimation: !this.state.enableBackAnimation,
        });

        //请求当天的pm2.5数据
        if(!this.state.airInfoPage && !hasFirstRequesthistoryData){
            this.getHistoryDataByDateString(thirtyDays[0], 0,null, null);
        }
    }

    handleAlert(){

        if(!hasShowErrorAlert){

            let alertMessage = "";
            if(this.state.FilterWarning &&  this.state.FilterWarning == 1){
                alertMessage = "滤网超过2000个小时";
            }else if(this.state.PM25SensorWarning &&  this.state.PM25SensorWarning == 1){
                alertMessage = "PM2.5传感器故障";
            }else if(this.state.SmellSensorWarning &&  this.state.SmellSensorWarning == 1){
                alertMessage = "气味传感器故障";
            }

            if(alertMessage.length > 2){
                het.toast(JSON.stringify({"contactService":alertMessage, "tel":"13662242507"}));

                hasShowErrorAlert = true;
            }

            let leftTime =  this.state.HourFilterWorkTime || 0;
            let filterMessage = "";
            if(leftTime >= 1800 && leftTime < 2000) {
                filterMessage="滤网即将到期，为不影响设备的正常使用，请及时更换滤网，并在设备长按\"定时键\"5s重置滤网工作时间。";
                let alertInfo = {
                    title:"",
                    content:filterMessage,
                    button:"知道了"
                };
                het.toast(JSON.stringify(alertInfo));
                hasShowErrorAlert = true;
            }else if(leftTime >= 2000){
                filterMessage="滤网已经到期，为不影响设备的正常使用，请及时更换滤网，并在设备长按\"定时键\"5s重置滤网工作时间。";
                het.toast(JSON.stringify({"contactService":filterMessage, "tel":"13662242507"}));
                hasShowErrorAlert = true;
            }

            let PM25Value = this.state.PM25Value || 0;
            if(PM25Value > 500){
                filterMessage="PM2.5数值过高，请检查您的污染源";
                let alertInfo = {
                    title:"",
                    content:filterMessage,
                    button:"知道了"
                };
                het.toast(JSON.stringify(alertInfo));
                hasShowErrorAlert = true;
            }
        }
    }

    showFilterLeftTimeMode(){
        this.setState({
            filterTimePercentMode:!this.state.filterTimePercentMode,
        });
    }

    render() {

        //console.log("appmain render");

        //console.log("state: "+ JSON.stringify(this.state));
        this.handleAlert();

        let workModeIndex = this.state.WorkModeValue || 1;
        let workModeValue = (workModeIndex > 1) ? WorkModeArray[workModeIndex - 1] : "自动";
        let switchValue  = workModeIndex == 1 ? "开机":"关机";

        let alarmClockIndex = ((this.state.TimeSetValue || 255) < 9) && ((this.state.TimeSetValue || 255) > 0);
        let alarmClockPath = alarmClockIndex ? "../static/image/appmain/alarmClock03.png" : "../static/image/appmain/alarmClock02.png";
        let  alarmClock = alarmClockIndex ? "appMain_selected" : "";

        let UvStateState = (this.state.UvState || 2) == 1;
        let UvImagePath = UvStateState ? "../static/image/appmain/uvmode03.png" : "../static/image/appmain/uvmode02.png";
        let  ultravioletLamp = UvStateState ? "appMain_selected" : "";

        let IonizerState = (this.state.IonizerState || 2) == 1;
        let IonImagePath = IonizerState ? "../static/image/appmain/anionmode03.png" : "../static/image/appmain/anionmode02.png";
        let anionMode = IonizerState ? "appMain_selected" : "";

        let autoModeIndex = (this.state.WorkModeValue || 2) ;
        let autoModePath =  "../static/image/appmain/automode01.png";
        let autoMode =  "";


        let leftHour = this.state.HourRemainingTime || 0 ; //  剩余时间小时  0-8 默认为255
        if(leftHour > 9){
            leftHour = 0;
        }
        let leftMinute = this.state.MinuteRemainingTime || "0"; //剩余时间分钟 0-59
        let workStatus = "";

        //console.log("leftHour: " + leftHour + " leftMinute:" + leftMinute);

        if(alarmClockIndex ){
            workStatus = " 定时中"+ leftHour + "小时" + leftMinute +"分钟后关闭";
        }
        if(workModeIndex == 1){
            workStatus = "已关机";
        }

        switch (autoModeIndex){
            case 1:autoModePath =  "../static/image/appmain/automode01.png";  break;
            case 2:autoModePath =  "../static/image/appmain/automode03.png";autoMode =  "appMain_selected"; break;
            case 3:autoModePath =  "../static/image/appmain/lowspeed03.png";autoMode =  "appMain_selected";break;
            case 4:autoModePath =  "../static/image/appmain/midlespeed03.png";autoMode =  "appMain_selected";break;
            case 5:autoModePath =  "../static/image/appmain/hightspeed03.png";autoMode =  "appMain_selected";break;
            case 6:autoModePath =  "../static/image/appmain/sleepmode03.png";autoMode =  "appMain_selected";break;
            case 7:autoModePath =  "../static/image/appmain/sleepmode02.png";autoMode =  "appMain_selected";break;
        }

        if(!this.state.onLinestatue){
            workStatus = "设备失去连接，请尝试重新连接";
        }
        let globalDisable="";
        let enableBackAnimation = this.state.enableBackAnimation ;

        let childLock = (this.state.ChildLockState || 1) == 2;
        let switchDisable = "";
        if(childLock){
            alarmClockPath = "../static/image/appmain/alarmClock01.png";
            alarmClock = "appMain_disabled";
            UvImagePath = "../static/image/appmain/uvmode01.png";
            ultravioletLamp= "appMain_disabled";
            IonImagePath = "../static/image/appmain/anionmode01.png";
            anionMode = "appMain_disabled";
            autoModePath ="../static/image/appmain/automode01.png";
            autoMode =  "appMain_disabled";
            switchDisable = "switchDisable";
        }

        if(workModeIndex == 1 || !this.state.onLinestatue){
            alarmClockPath = "../static/image/appmain/alarmClock01.png";
            alarmClock = "appMain_disabled";
            UvImagePath = "../static/image/appmain/uvmode01.png";
            ultravioletLamp= "appMain_disabled";
            IonImagePath = "../static/image/appmain/anionmode01.png";
            anionMode = "appMain_disabled";
            autoModePath ="../static/image/appmain/automode01.png";
            autoMode =  "appMain_disabled";
            globalDisable = "globalDisable";
            enableBackAnimation = false;
        }

        let PM25Value = this.state.pm25 || "0";
        let airValue= "中";
        let currentAirQuality = this.state.CurrentAirQuality || 2;
        var airstatus = "";

        let moveDirection = "";
        let graintColor = pointColor[0];

        switch (currentAirQuality){
            case 1: {
                airValue= "优";
                airstatus = airStatusStrArray[0];
                graintColor = pointColor[0];
                moveDirection = "output";
                break;
            }
            case 2: {
                airValue= "中";
                airstatus = airStatusStrArray[1];
                graintColor = pointColor[1];
                moveDirection = "input";
                break;}
            case 3: {
                airValue= "差";
                airstatus = airStatusStrArray[2];
                graintColor = pointColor[2];
                moveDirection = "input";
                break;
            }
            default: {
                airValue = "优";
                airstatus = airStatusStrArray[0];
                graintColor = pointColor[0];
                moveDirection = "output";
                break;
            }
        }

        let gpsLocationCityName = this.state.cityName || "";
        let selectshow = this.state.selectshow;
        let timeSelectDataSource = fixedTim;
        if(selectshow && !isFixdTime){
            timeSelectDataSource = daySelect;
        }
        let leftTime =  this.state.HourFilterWorkTime || 0;
        let leftPercent = 100 - ( Math.floor(leftTime)/20);
        leftPercent = leftPercent < 0 ? "0" : leftPercent;
        leftPercent = parseInt(leftPercent);
        let leftLifeTimeStr = "滤网寿命剩余" + leftPercent +"%";
        if(!this.state.filterTimePercentMode){
            let leftHours = (2000 - Math.floor(leftTime));
            if(leftHours < 0){
                leftHours = 0;
            }
            leftLifeTimeStr = "滤网寿命剩余" + leftHours + "小时";
        }
        let filterAlertImagePathStyle = leftPercent < 10 ? { }: {paddingRight: "6px", visibility:"hidden"} ;




        return <div className="container">
            <div className="watingPage">
                <div className="diveceView ">
                    <div className={"dirt_image " }>
                        {/*<div className={"dirt_image dirt_status_"+airstatus}>*/}

                        {
                            (function (){
                                if(enableBackAnimation){
                                    console.log("i enableBackAnimation ");

                                    {/*return <DirtView airStatus={airstatus}/>*/}

                                    return     <EmitterCSSAnimation
                                    direction={moveDirection}
                                    grainColor={graintColor}/>  ;

                                    {/*return  <YYEmitterCSSAnimation*/}
                                {/*direction={moveDirection}*/}
                                {/*grainColor={graintColor}/>  ;*/}

                                    {/*return <YYImageAnimation />*/}
                                }
                            })()
                        }


                    </div>
                    <div className={"deviceWasherImage " + globalDisable}>
                        <div className="circleView ">
                            <div className="circleView_middle " >
                                <div className={"circleView_inner "+ airstatus }style={{width:halfScreenWidth, height:halfScreenWidth} }>
                                    {/*<CircleWave className="waterWave" />*/}
                                </div>
                            </div>
                            <div className={"air_info " + globalDisable} style={{ top:airInfoPercent}}>
                                <span>空气质量等级</span>
                                <h3 className="air_info_level">{airValue}</h3>
                                <div className="locationInfo" onTouchStart={this.switchToWeather.bind(this)}>
                                    <img src="../static/image/appmain/location.png" />
                                    <span >{gpsLocationCityName}</span>
                                </div>
                                <div className="pmTempValue">
                                    <span>室外PM2.5:{PM25Value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="device_control">
                        <div className="device_control_relative">
                            <dl className={"wash_children_lock "  + globalDisable} onTouchStart={this.childLockAction.bind(this)}>
                                <dd ><img src={"../static/image/appmain/childerlock_"+ (childLock?"on.png":"off.png")} width='36' height='36'/></dd>
                                <dt>童锁</dt>
                            </dl>
                            <dl className={"wash_switch " + switchDisable} onTouchStart={this.switchAction.bind(this)}>
                                <dd><img src="../static/image/appmain/wash_switch.png" width='36' height='36'/></dd>
                                <dt>{switchValue}</dt>
                            </dl>
                            <div className={"screen_life_relative " + globalDisable}>
                                <div onTouchStart={this.showFilterLeftTimeMode.bind(this)}>
                                    <img src="../static/image/appmain/filterImage.png" width="15" height="15" style={filterAlertImagePathStyle}/>
                                    <span>{leftLifeTimeStr}</span>
                                </div>
                                <div className="arrow_panel" onTouchStart={this.switchToPMValueHistoryView.bind(this)}>
                                    <img src="../static/image/appmain/arrow_up.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AirStatePage
                    show={this.state.airInfoPage}
                    hiddenAction={this.switchToPMValueHistoryView.bind(this)}

                    selectOneDay={this.selectOneDay.bind(this)}
                    selectOneDayOnMonth={this.state.oneDayOnMonthSelect}
                    selectOneDayOnMonthRequest = {this.state.oneDayOnMonthSelectRequest}

                    historyData = {this.state.historyOneDayData}
                />
                <div className="ControlPannelUpWave">
                    <Wave waveID="workWave"/>
                </div>
                <div className="device_panel">
                    <h3 style={{height:"20px"}}>{workStatus}</h3>
                    <section className="flex control_btn_list">
                        <dl className={"flex-cell" }  key="0" data-index="0" onTouchStart={this.autoModeAction.bind(this)}>
                            <dd className={autoMode}><img src={autoModePath}/></dd>
                            <dt className={autoMode}><p >{workModeValue}</p></dt>
                        </dl>
                        <dl className={"flex-cell"} key="1" data-index="1" onTouchStart={this.alarmColokAction.bind(this)}>
                            <dd className={alarmClock} ><img src={alarmClockPath}/></dd>
                            <dt className={alarmClock}><p >定时</p></dt>
                        </dl>
                        <dl className={"flex-cell"} key="2" data-index="2" onTouchStart={this.anionModeAction.bind(this)}>
                            <dd className={anionMode}> <img src={IonImagePath}/></dd>
                            <dt className={anionMode}><p >负离子</p></dt>
                        </dl>
                        <dl className="flex-cell" key="3" data-index="3" onTouchStart={this.ultravioletLampAction.bind(this)}>
                            <dd className={ultravioletLamp}><img src={UvImagePath}/></dd>
                            <dt className={ultravioletLamp}><p >紫外灯</p></dt>
                        </dl>
                    </section>
                </div>
                {/*<div className="arrow_panel" onTouchStart={this.switchToPMValueHistoryView.bind(this)}>*/}
                    {/*<img src="../static/image/appmain/arrow_up.png" />*/}
                {/*</div>*/}

            </div>

            <TimeSelect

                needUpdateArray={false}
                show={selectshow}
                title={timeSelectDataSource.title}
                statusshow={timeSelectDataSource.statusshow}

                hourshow={true}
                hourstep ={1}
                hourunit={timeSelectDataSource.hourunit}
                minhour={timeSelectDataSource.minhour}
                maxhour={timeSelectDataSource.maxhour}

                minuteshow={false}
                minutestep={1}
                minuteunit={''}
                minminute ={0}
                maxmin={0}

                defaulthour={timeSelectDataSource.defaulthour}
                defaultminute={'0'}
                cancelClock={this.cancelClock.bind(this)}
                submitClock={this.submitClock.bind(this)}
                hourarray={timeSelectDataSource.hourarray}
                ArrayInit={false}
            />
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
   // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/forcast" component={WeatherForecast}/>
        </Router>
    ), document.getElementById('ROOT'));
});