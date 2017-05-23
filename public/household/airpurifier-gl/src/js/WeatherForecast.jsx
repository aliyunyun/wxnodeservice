/**
 * Created by yuanyunlong on 2017/4/17.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {getTemp,getCity, getPM25,getWeatherForeCast,getSevenDayWeatherForeCastCacheData,getAddr} from './RequestAction.jsx';

let canvaswidth = "1280";
let canvasheight = "300";
let seventHeighLowTempArray = [];
let sevenHieghtLowTempAndTimeArray = [];

let weather7dayData = {"code":0,"data":[{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":28,"temp2":19,"wtext":"雷阵雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/04.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/04.png","weatherV2Icon":null,"humidity":null,"windScale":"28.44","windSpeed":"28.44","windDirection":"南风","pressure":null,"pm25":null,"updateTime":1492704000000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":21,"temp2":19,"wtext":"小雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png","weatherV2Icon":null,"humidity":null,"windScale":"28.44","windSpeed":"28.44","windDirection":"东北风","pressure":null,"pm25":null,"updateTime":1492790400000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":24,"temp2":19,"wtext":"小雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png","weatherV2Icon":null,"humidity":null,"windScale":"19.44","windSpeed":"19.44","windDirection":"无持续风向","pressure":null,"pm25":null,"updateTime":1492876800000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":27,"temp2":23,"wtext":"小雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/07.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/07.png","weatherV2Icon":null,"humidity":null,"windScale":"19.44","windSpeed":"19.44","windDirection":"无持续风向","pressure":null,"pm25":null,"updateTime":1492963200000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":28,"temp2":22,"wtext":"阵雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/03.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/03.png","weatherV2Icon":null,"humidity":null,"windScale":"19.44","windSpeed":"19.44","windDirection":"无持续风向","pressure":null,"pm25":null,"updateTime":1493049600000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":27,"temp2":21,"wtext":"雷阵雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/04.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/04.png","weatherV2Icon":null,"humidity":null,"windScale":"28.44","windSpeed":"28.44","windDirection":"东北风","pressure":null,"pm25":null,"updateTime":1493136000000},{"cityId":101280601,"cityName":"深圳","aqi":null,"temp":null,"temp1":23,"temp2":21,"wtext":"阵雨","bgIcon":"","weatherBigIcon":"http://200.200.200.50:8080/static/weatherIcon/1080/day/03.png","weatherSmallIcon":"http://200.200.200.50:8080/static/weatherIcon/P6/day/03.png","weatherV2Icon":null,"humidity":null,"windScale":"19.44","windSpeed":"19.44","windDirection":"无持续风向","pressure":null,"pm25":null,"updateTime":1493222400000}]};

export class WeatherForecast extends BaseComponent {
    constructor(props){
        super(props);

        //this.listenStore(Store); // 监听Store

        canvaswidth = window.screen.width;
        canvasheight = window.screen.height;
        let WeatherData = getSevenDayWeatherForeCastCacheData();
        if(WeatherData){
            console.log("constructor 有缓存数据 ");
            this.state = {
                weatherData:WeatherData
            };

        }else{
            this.state = {
                weatherData:[]
            };
            console.log("constructor 没有有缓存数据 ");
            this.getWeatherInfo();
        }

    }


    componentWillMount(){
        let city = getCity();
        let addr = getAddr();

        if(addr){
            het.setTitle(JSON.stringify({
                setNavTitle:1,
                title:addr,
                setNavRightBtnHiden:1
            }));
        }else{
            het.setTitle(JSON.stringify({
                setNavTitle:1,
                title:city,
                setNavRightBtnHiden:1

            }));
        }
    }

    getWeatherInfo(){

        let _this = this;
        let successCB = function (weatherdata) {
            console.log("getWeatherInfo success data 11111111:" + weatherdata );


            _this.getHieghtLowTempFormWeatherData(weatherdata);
            _this.drawWeatherInfo();

            _this.setState({
                weatherData:weatherdata,
            });
          //  Actions.setWeatherData(weatherdata);
        };
        let errorCB = function (error) {
            het.toast("获取天气信息失败");
        };
        getWeatherForeCast(successCB,errorCB);
    }

    getHieghtLowTempFormWeatherData(data){
        var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        seventHeighLowTempArray = [];
        sevenHieghtLowTempAndTimeArray = []; // 清空数据

        let now = new Date();
        let currentDay = now.getDate();

        if(data){
            data.map(function (value, index, array) {

                let oneDayTem = {
                    height: value["temp1"] || "0",
                    low: value["temp2"] || "0",
                };
                seventHeighLowTempArray.push(oneDayTem);

              //  if(index != 0){
                    let newDAY = new Date();
                    let nextNow = newDAY.setDate(currentDay + index);
                    let nextDay = new Date(nextNow);
                    let week = nextDay.getDay();

                    let forecastDay = {
                        time:weekArray[week],
                        image:value["weatherSmallIcon"],
                        temp1:value["temp1"] || 0,
                        temp2:value["temp2"] || 0
                    };
                    sevenHieghtLowTempAndTimeArray.push(forecastDay);
               // }
            });
        }


    }

    componentDidMount() {

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

        console.log("pixelRatio:" + pixelRatio);

        let drawing = document.querySelector('#sevenForecastChartHight');
        drawing.width = window.screen.width * pixelRatio;
        drawing.height =  window.screen.height * 0.15 * pixelRatio;
        let context = drawing.getContext('2d');

        let drawinglow = document.querySelector('#sevenForecastChartLow');
        drawinglow.width = window.screen.width * pixelRatio ;
        drawinglow.height =  window.screen.height * 0.15 * pixelRatio;
        let contextlow = drawinglow.getContext('2d');

        this.setState({
            drawingHeight: drawing,
            contextHeight: context,
            drawingLow: drawinglow,
            contextLow: contextlow,
            contentWidth: window.screen.width * pixelRatio,
            contentHeight: window.screen.height  * 0.15 * pixelRatio,
            pixelRatio:pixelRatio,
        });

        console.log("componentDidMount");
        if(this.state.weatherData && this.state.weatherData.length > 0){
            this.getHieghtLowTempFormWeatherData(this.state.weatherData);
            this.drawWeatherInfo();
        }

        //  测试
        // this.setState({
        //     weatherData:weather7dayData["data"]
        // });
        // let weatherData = weather7dayData["data"] ;
        // this.getHieghtLowTempFormWeatherData(weatherData);
        // this.drawWeatherInfo();
    }

    drawWeatherInfo(){
        let _this = this;
        setTimeout(function () {
            _this.drawChart();
            _this.drawChartLow();
        }, 100);
    }

    drawLineWithColorAndData(MaxTemp,minTemp, drawYHeight,startPointX,xSpace,context,lineColor, upParmas, isHeight, pixelRatio){
        let ybaseValue = MaxTemp - minTemp ;
        let expandValue  = ybaseValue;
        if(expandValue == 0){ expandValue =1 ;}
        ybaseValue = ybaseValue + expandValue*4 ;

        console.log("ybaseValue:" + ybaseValue + " expandValue：" + expandValue);
        let len = seventHeighLowTempArray.length;
        for(let index = 0; index < len; index++){

            let heightValue =  seventHeighLowTempArray[index].height;
            if(isHeight == false){
                 heightValue =  seventHeighLowTempArray[index].low;
            }
            let heightValueZero = heightValue - minTemp + expandValue*upParmas ;
            let yValue = drawYHeight*(1- heightValueZero/ybaseValue) ;
            let xValue = startPointX + index*xSpace;

            if(index == 0){
                context.moveTo(startPointX, yValue);
            }else{
                context.lineTo(xValue , yValue);

            }
            context.lineWidth = 1 * pixelRatio;
            context.stroke();

            context.beginPath();
            context.arc(xValue,yValue, 3*pixelRatio, 0, Math.PI*2, true);
            context.fillStyle =  lineColor;
            context.strokeStyle = lineColor;
            context.fill();
            context.stroke();
            context.closePath();
            let fontSize = 12 * pixelRatio;

            context.font = "bold " + fontSize+ "px '字体','Arial'";
            context.fillStyle =  "rgba(255,255,255,1)";
            context.fillText(heightValue, xValue- 7*pixelRatio, yValue - 7*pixelRatio, 20* pixelRatio);
            // console.log("height pointX: " + xValue + "pointY:" + yValue + " temp:" + heightValue);
        }
        context.stroke();
    }

    drawChart(){

        let context = this.state.contextHeight;
        let contentWidth = this.state.contentWidth ;
        let contentHeight = this.state.contentHeight ;
        let pixelRatio = this.state.pixelRatio;

        let startPointX = 20*pixelRatio;
        let drawXWidth = contentWidth - startPointX*2;       // 绘图区域的宽度
        let drawYHeight = contentHeight; // 绘图区域的高度

        let xSpace = drawXWidth /6;

        let MaxTemp = seventHeighLowTempArray[0].height;
        let minTemp = seventHeighLowTempArray[0].height;
        let len = seventHeighLowTempArray.length;
        for(let i = 1; i < len; i++){
           let temp = seventHeighLowTempArray[i];
            if(temp.height > MaxTemp){
                MaxTemp = temp.height;
            }else if(temp.height < minTemp){
                minTemp = temp.height;
            }

        }
        //console.log("maxTemp:" + MaxTemp + "minTemp:" + minTemp + " height:" + drawYHeight);
        this.drawLineWithColorAndData(MaxTemp,minTemp, drawYHeight,startPointX,xSpace,context,"rgba(255,255,255,1)", 0.2, true, pixelRatio);
    }


    drawChartLow(){

        let context = this.state.contextLow;
        let contentWidth = this.state.contentWidth ;
        let contentHeight = this.state.contentHeight ;
        let pixelRatio = this.state.pixelRatio;

        let startPointX = 20*pixelRatio;
        let drawXWidth = contentWidth - startPointX*2;       // 绘图区域的宽度
        let drawYHeight = contentHeight; // 绘图区域的高度

        let xSpace = drawXWidth /6;

        let MaxTemp = seventHeighLowTempArray[0].low;
        let minTemp = seventHeighLowTempArray[0].low;
        let len = 7;
        for(let i = 1; i < len; i++){
            let temp = seventHeighLowTempArray[i];
            if(temp.low > MaxTemp){
                MaxTemp = temp.low;
            }else if(temp.low < minTemp){
                minTemp = temp.low;
            }

        }
        //console.log("maxTemp:" + MaxTemp + "minTemp:" + minTemp + " height:" + drawYHeight);
        this.drawLineWithColorAndData(MaxTemp,minTemp, drawYHeight,startPointX,xSpace,context,"rgba(255,255,0,1)", 2, false,pixelRatio);

    }

    render(){

        console.log("weatherData render hidden ");
        let showWeatherInfo = {visibility:"hidden"};
        let weatherData = this.state.weatherData ;

        console.log("weatherData:" +  JSON.stringify(weatherData));

        let currentDayWeatherImagePath =  "";
        let currentDayWeatherTemp = "";
        let currentWtext ="";

        if(weatherData && weatherData.length > 0){
            console.log("weatherData render  visible");
            showWeatherInfo = {visibility:"visible"};
            let currentDayInfo = weatherData[0];
            currentDayWeatherImagePath = currentDayInfo["weatherSmallIcon"];
            currentWtext = currentDayInfo["wtext"];
            currentDayWeatherTemp = currentDayInfo["temp1"] + "°";
        }else{
             console.log("weatherData render hidden ");
            showWeatherInfo = {visibility:"hidden"}
        }

        let PM25Value = getPM25();
        // let temp = getTemp() + "°";
        // if(temp.length < 2){
        //     temp = currentDayWeatherTemp;
        // }

        // console.log("pm25value:  " +  PM25Value);
        // console.log("temp:  " +  temp);

        return (
            <main className="main">
                <section className="weatherView" style={showWeatherInfo}>
                    <div className="paddingContent"> </div>
                    <div className="todayweather">
                        <div className="todayweatherImage">
                            <img src={currentDayWeatherImagePath}/>

                        </div>
                        <div className="todayweatherAir">
                            <div className="todayweatherTemp">{currentDayWeatherTemp}</div>
                            <div className="todayweatherPm">{currentWtext} PM2.5 {PM25Value}</div>
                        </div>
                        <div className="sevenForecastTitle">
                            7天预报
                        </div>
                    </div>
                    <div className="sevenForecastChartContainer">
                        <canvas id="sevenForecastChartHight" className="sevenForecastChartHight"  >

                        </canvas>
                        <canvas id="sevenForecastChartLow" className="sevenForecastChartLow" >

                        </canvas>
                    </div>
                    <div className="sevenForecastTemp">
                        {sevenHieghtLowTempAndTimeArray.map(function (value,index) {
                            let week = value["time"];
                            let imagePath = value["image"] || "";
                            let temp1 = value["temp1"] || "0";
                            temp1 = temp1 + "°";
                            let temp2 = value["temp2"];
                            temp2 = temp2 + "°";

                            return <div className="flex sevenForecastOneDayTemp" key={index}>
                                <div className="week flex-cell">{week}</div>
                                <div className="weekWeatherImage flex-cell"><img src={imagePath}/></div>
                                <div className="weekWeatherTemp flex-cell">
                                    <span>{temp1}</span>
                                    <span>{temp2}</span>
                                </div>
                            </div>;
                        }.bind(this))
                        }
                    </div>
                </section>
            </main>

        );
    }


}