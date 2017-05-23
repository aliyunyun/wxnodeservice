


let deviceId = "";
let PM25 = "";
let temp = "";
let city = "";
let addr = "";
let sevenDayWeatherForeCastCacheData = null;
let FirstNotGetCityTimes = 0;

let cacheHistoryData = new Map();

function getSevenDayWeatherForeCastCacheData(){
    return  sevenDayWeatherForeCastCacheData;
}

function setAddr(value){
    addr = value;
}

function getAddr() {
    return addr;
}

function setCity(value){
    city = value;
}

function getCity() {
    return city;
}

function setDeviceId( id) {
    deviceId = id;
}

function setTemp(value){
    temp = value;
}
function  getTemp() {
    return temp;
}

function setPM25(value){
    PM25 = value;
}
function  getPM25() {
    return PM25;
}

function getFilterHistory(date, type,successCB, errorCB) {
    console.log("getFilterHistory");

   if(deviceId.length < 1){
       errorCB();
   }

    let url = "/v1/app/customization/guangleiairpurifier/getRecordList";
    let shortDate = "";
    if(type==0){
        let nextDay = new Date();
        date = nextDay.Format("yyyy-MM-dd hh:mm:ss");
        shortDate = nextDay.Format("yyyy-MM-dd-hh");
    }

    // 从缓存获取数据
    if(type == 0){
       if(cacheHistoryData.has(shortDate)){
           if(typeof successCB === 'function'){
               successCB(cacheHistoryData.get(shortDate));
           }
           return ;
       }
    }else{
        if(cacheHistoryData.has(date)){
            if(typeof successCB === 'function'){
                successCB(cacheHistoryData.get(date));
            }
            return ;
        }
    }

    let requestParmars = {
        deviceId:deviceId,
        date:date,
        type:type,
    };

    let successcallback = function(data){
        let dataString =  data.toString();
        let jsondata = JSON.parse(dataString);
        jsondata = jsondata['data'];

        console.log("PM2.5 请求成功");
        if(typeof successCB === 'function'){
            successCB(jsondata);
        }

        if(type == 0){
            cacheHistoryData.set(shortDate, jsondata);
        }else{
            cacheHistoryData.set(date, jsondata)
        }
    };
    let failedcallback = function(error){
        console.log("请求失败" +error.toString());
        het.toast("获取PM25历史记录失败");
        if(typeof errorCB === 'function'){
            errorCB();
        }

    };

    het.get(url,requestParmars,successcallback,failedcallback,false)
}


function getWeatherForeCast(successCB,errorCB) {
    //console.log("getWeatherForeCast");

    if(city.length < 1){
       // console.log("city 获取失败");
        FirstNotGetCityTimes++;

        if(FirstNotGetCityTimes%2 == 1){
            //console.log("city 获取失败： " + FirstNotGetCityTimes);
            setTimeout(function () {
                getWeatherForeCast(successCB,errorCB);
            },3000);
        }
    }

    let url = "/v1/app/customization/guangleiairpurifier/get7DaysWeatherForcast";
    let requestParmars = {
        city:city,
    };
    let successcallback = function(data){
        let dataString =  data.toString();

        let jsondata = JSON.parse(dataString);
         jsondata = jsondata['data'];
        sevenDayWeatherForeCastCacheData = jsondata;

       // console.log("天气预报成功 jsondata: ", jsondata);
        if(typeof successCB === 'function'){
            successCB(jsondata);
        }
    };
    let failedcallback = function(error){
       // console.log("请求失败" +error.toString());
        if(typeof  error === 'function'){
            errorCB();
        }
    };

    het.get(url,requestParmars,successcallback,failedcallback,false);
}

var pixelRatio = (function() {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
})();

function getPoxelRation(){
    return pixelRatio;
}



module.exports = {setAddr,getAddr,setTemp,getTemp,getPoxelRation,setCity, getCity, setDeviceId, setPM25, getPM25, getFilterHistory, getWeatherForeCast,getSevenDayWeatherForeCastCacheData};