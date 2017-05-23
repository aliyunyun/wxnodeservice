'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
import {setDeviceInfo, getDeviceInfo, hasSetRequest} from './DeviceTokenCache.jsx';
import {setTemp,setCity, setDeviceId, setPM25,setAddr} from './RequestAction.jsx';

// 控制字段
// OnOffSet     开关机设置   1 开机 2 关机
// ModeSet      模式设置     2自动 3低速模式 4中速模式 5告诉模式 6睡眠模式
// WorkTimeSet  工作时间设置  1 2 4 8 小时， 默认为255
// ChildLockSet 童锁         1关闭 2童锁打卡
// UvSet        紫外线设置    1 开启 2 关闭
// IonizerSet   负离子设置     1开启 2 关闭

// 运行模式
// WorkModeValue        工作模式  1待机模式 2自动模式 3低速模式 4中速模式 5高速模式 6睡眠模式 7睡眠唤醒模式
// TimeSetValue         工作时间设定  1 2 4 8 255
// HourRemainingTime    剩余时间小时  0-8 默认为255
// MinuteRemainingTime  剩余时间分钟 0-59
// ChildLockState       儿童锁状态  1 不锁定 2 锁定
// UvState              紫外线状态
// IonizerState         负离子状态
// PM25Value            PM25
// SmellSensorValue     气味传感器值  0优 1良 2中 3差
// HourFilterWorkTime   滤网工作时间小时 0-2000
// MinuteFilterWorkTime 滤网工作时间分钟 0-59
// CurrentAirQuality    当前空气质量    1优良   2中等  3差等


//故障数据
// FilterWarning       滤网告警          1正常  2超过2000个小时
// PM25SensorWarning   PM25传感器警告    1正常  2异常
// SmellSensorWarning  气味传感器警告     1正常  2异常
//

let dataFilterTimers = {
    WorkModeValue:0,
    TimeSetValue:0,
    ChildLockState:0,
    UvState:0,
    IonizerState:0,
    HourRemainingTime:0,
    MinuteRemainingTime:0,
};
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }else{
                console.log("yy filter: " + k);
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}
// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

let isFirstGet = true;

var appData = {
    online: 2,
    onLinestatue:false,
    networkavailable: '2',
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){

        let data =  dataFilter(datas);

        console.log("data:" + data);
        //控制数据
        if(data.OnOffSet != undefined){
            appData.OnOffSet = data.OnOffSet;
            appData.OnOffSet == '1' ? (appData.WorkModeValue = '2') : (appData.WorkModeValue = '1');

        }
        if(data.ModeSet != undefined){
            appData.ModeSet = data.ModeSet;
            if(appData.OnOffSet == '1'){
                appData.WorkModeValue = appData.ModeSet;
            }
            // if(!isFirstGet){
            //     setDataTimer("WorkModeValue");
            // }
            // isFirstGet = false;

        }
        if(data.WorkTimeSet != undefined){
            appData.WorkTimeSet = data.WorkTimeSet;
            // appData.TimeSetValue = appData.WorkTimeSet;
            // if( appData.WorkTimeSet < 9 && appData.WorkTimeSet > 0){
            //     appData.HourRemainingTime = appData.WorkTimeSet ;
            //     appData.MinuteRemainingTime = "00";
            // }
            // if(!isFirstGet){
            //     setDataTimer("HourRemainingTime","MinuteRemainingTime");
            // }else{
            //     console.log("clear 定时设置");
            //     appData.HourRemainingTime = "00";
            //     appData.MinuteRemainingTime = "00";
            // }
            // isFirstGet = false;

        }
        if(data.ChildLockSet != undefined){
            appData.ChildLockSet = data.ChildLockSet;
            appData.ChildLockState = appData.ChildLockSet;
            // if(!isFirstGet){
            //     setDataTimer("ChildLockState");
            // }

        }
        if(data.UvSet != undefined){
            appData.UvSet = data.UvSet;
            appData.UvState = data.UvSet;
            // if(!isFirstGet){
            //     setDataTimer("UvState");
            // }

        }
        if(data.IonizerSet != undefined){
            appData.IonizerSet = data.IonizerSet;
            appData.IonizerState = data.IonizerSet;
            // if(!isFirstGet){
            //     setDataTimer("IonizerState");
            // }
            // isFirstGet = false;
        }

        //运行数据
        if(data.WorkModeValue != undefined){ appData.WorkModeValue = data.WorkModeValue; }
        if(data.TimeSetValue != undefined){ appData.TimeSetValue = data.TimeSetValue; }
        if(data.HourRemainingTime != undefined){ appData.HourRemainingTime = data.HourRemainingTime; }
        if(data.MinuteRemainingTime != undefined){ appData.MinuteRemainingTime = data.MinuteRemainingTime; }
        if(data.ChildLockState != undefined){ appData.ChildLockState = data.ChildLockState; }


        if(data.UvState != undefined){ appData.UvState = data.UvState; }
        if(data.IonizerState != undefined){ appData.IonizerState = data.IonizerState; }

        if(data.PM25Value != undefined){ appData.PM25Value = data.PM25Value; }
        if(data.SmellSensorValue != undefined){ appData.SmellSensorValue = data.SmellSensorValue; }
        if(data.HourFilterWorkTime != undefined){ appData.HourFilterWorkTime = data.HourFilterWorkTime; }
        if(data.MinuteFilterWorkTime != undefined){ appData.MinuteFilterWorkTime = data.MinuteFilterWorkTime; }
        if(data.CurrentAirQuality != undefined){ appData.CurrentAirQuality = data.CurrentAirQuality; }


        // 告警数据
        // FilterWarning       滤网告警          1正常  2超过2000个小时
        // PM25SensorWarning   PM25传感器警告    1正常  2异常
        // SmellSensorWarning  气味传感器警告     1正常  2异常
        if(data.FilterWarning)                           appData.FilterWarning = data.FilterWarning;
        if(data.PM25SensorWarning)                       appData.PM25SensorWarning = data.PM25SensorWarning;
        if(data.SmellSensorWarning)                      appData.SmellSensorWarning = data.SmellSensorWarning;

        //离线&故障
        if(data.online)                                 appData.online = data.online;
        if(data.networkavailable)                       appData.networkavailable = data.networkavailable;
        if(appData.online == 2){
            appData.onLinestatue = false;
        }else{
            appData.onLinestatue = true;
        }

        if(data.temp != undefined){
            appData.temp = data.temp;
            setTemp(data.temp);
        }

        if(data.cityName != undefined){
            appData.cityName = data.cityName;
            setCity(data.cityName);
        }
        if(data.pm25 != undefined){ appData.pm25 = data.pm25; setPM25(appData.pm25);}

        if(data.appId != undefined) appData.appId = data.appId;
        if(data.deviceId != undefined){
            setDeviceId(data.deviceId);
            appData.deviceId = data.deviceId;
        }
        if(data.addr != undefined) {
            appData.addr = data.addr;
            setAddr(data.addr);
            console.log("addr:" + appData.addr);
        }
        // if(data.accessToken != undefined) appData.accessToken = data.accessToken;
        // if(data.deviceId != undefined  && !hasSetRequest()){
        //     setDeviceInfo(data.accessToken,data.deviceId);
        // }

        this.trigger(appData);

    },
    onSetMondeAction(modeIndex){

        if(checkChildLodkAction()){ console.log("童锁打开了"); return;}
        if(checkNetWorkLockedAction()){ console.log("没有网了"); return;}
        if(checkPowerOnAction()){console.log("没有开机"); return;}

        let currentModeIndex = modeIndex;
        if(modeIndex > 5){
            currentModeIndex = 1;
        }
        let nextMode = currentModeIndex + 1;

        let index = nextMode;

        appData.WorkModeValue = nextMode;

         let updateFlag = het.hexUpFlag(1 , 1, 2);
         let  switchData = {
                ModeSet: parseInt(index,10),
                updateFlag: updateFlag
         };
        this.trigger(appData);
        setDataTimer("WorkModeValue");
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});

    },
    onSetIonizerAction(modeIndex){

        if(checkChildLodkAction()){ console.log("童锁打开了"); return;}
        if(checkNetWorkLockedAction()){ console.log("没有网了"); return;}
        if(checkPowerOnAction()){console.log("没有开机"); return;}

        let currentSate = modeIndex;
        let nextState = 1;
        if(currentSate == 1){
            nextState = 2;
        }

       appData.IonizerState = nextState;

        let updateFlag = het.hexUpFlag(5 , 1, 2);
        let  switchData = {
            IonizerSet: parseInt(nextState,10),
            updateFlag: updateFlag
        };
        this.trigger(appData);
        setDataTimer("IonizerState");
       // console.log("控制命令 1111" + JSON.stringify(switchData) );
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});


    },
    onSetUvAction(modeIndex){

        if(checkChildLodkAction()){ console.log("童锁打开了"); return;}
        if(checkNetWorkLockedAction()){ console.log("没有网了"); return;}
        if(checkPowerOnAction()){console.log("没有开机"); return;}

        let currentSate = modeIndex;
        let nextState = 1;
        if(currentSate == 1){
            nextState = 2;
        }

        appData.UvState = nextState;

        let updateFlag = het.hexUpFlag(4 , 1, 2);
        let  switchData = {
            UvSet: parseInt(nextState,10),
            updateFlag: updateFlag
        };
        this.trigger(appData);
        setDataTimer("UvState");
       // console.log("控制命令 1111" + JSON.stringify(switchData) );
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});

    },
    onSetChildLockAction(modeIndex){

        if(checkNetWorkLockedAction()){ console.log("没有网了"); return;}
        if(checkPowerOnAction()){console.log("没有开机"); return;}

        let nextChildValue = 1;
        if(modeIndex == 1){
            nextChildValue = 2;
        }

        appData.ChildLockState = nextChildValue;

        // 童锁
        let updateFlag = het.hexUpFlag(3 , 1, 2);
        let switchData = {};
        if(appData.ChildLockState == 1){
            switchData = {
                ChildLockSet: parseInt("1",10),
                updateFlag: updateFlag
            }
        }else{
            switchData = {
                ChildLockSet: parseInt("2",10),
                updateFlag: updateFlag
            }
        }
        this.trigger(appData);
        setDataTimer("ChildLockState");

        console.log("控制命令 1111" + JSON.stringify(switchData));
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});
        console.log("控制命令 2222");


    },
    onSetSwitchStateAction(modexIndex){

        console.log("onSetSwitchStateAction dianji");
        if(checkChildLodkAction()){ console.log("童锁打开了"); return;}
        if(checkNetWorkLockedAction()){ console.log("没有网了"); return;}

        let nextChildValue = 1;
        if(modexIndex == 1){
            nextChildValue = 2;
        }

        appData.WorkModeValue = nextChildValue;

        let updateFlag = het.hexUpFlag(0 , 1, 2);
        let switchData = {};
        if(appData.WorkModeValue == 1){
            switchData = {
                OnOffSet: parseInt("2",10),
                updateFlag: updateFlag
            };
            appData.TimeSetValue = 255;
            appData.HourRemainingTime =  "0" ;
            appData.MinuteRemainingTime = "00";
            console.log("clear 定时设置1");
        }else{
            switchData = {
                OnOffSet: parseInt("1",10),
                updateFlag: updateFlag
            }
        }
        this.trigger(appData);
        setDataTimer("WorkModeValue","UvState","IonizerState","TimeSetValue","HourRemainingTime","MinuteRemainingTime");
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});

    },
    onSetTimeClock(timeIndex){
        appData.TimeSetValue = timeIndex;
        appData.HourRemainingTime =  timeIndex ;
        appData.MinuteRemainingTime = "00";
        console.log("setTIme" + timeIndex);

        let updateFlag = het.hexUpFlag(2 , 1, 2);
        let  switchData = {
            WorkTimeSet: parseInt(timeIndex,10),
            updateFlag: updateFlag
        };
        this.trigger(appData);
        setDataTimer("HourRemainingTime","MinuteRemainingTime","TimeSetValue");

        console.log("控制命令 1111" + JSON.stringify(switchData) );
        het.send(switchData, (data)=>{}, ()=>{het.toast("发送失败");});


    },
    onSetWeatherData(data){
        appData.weatherData = data;
        this.trigger(appData);
    }
});


function checkChildLodkAction(){
    let childLock = (appData.ChildLockState || 1) == 2;  // == 2表示童锁打开
   return childLock ;
   // return false;
}

function checkNetWorkLockedAction(){
    let netWorkState = appData.onLinestatue  ;  // true 表示有网
    return !netWorkState;
   // return false;
}

function checkPowerOnAction(){
    let workModeIndex = appData.WorkModeValue || 1;
    return workModeIndex == 1; // ===1 表示待机中
   // return false;
}
