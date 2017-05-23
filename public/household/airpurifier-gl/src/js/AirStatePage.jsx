
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {TimeSelect} from './TimeSelect.jsx';
let isIOS = true;
let halfHeight = 300;


let todayTimeStr = "";
export class AirStatePage extends BaseComponent{
    constructor(props){
            super(props);

        //导航栏:{ios:73,android:64}
        isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        halfHeight = window.screen.height * 0.65 * 0.65;
        this.state = {
            selectshow: true
        };

        var now = new Date();
        todayTimeStr =  now.getFullYear()  + "年"+ (now.getMonth()+1) + "月"+ now.getDate() + "日";
    }

    hiddenAction(){
        if(typeof this.props.hiddenAction === 'function'){
            this.props.hiddenAction();
        }
    }


    componentDidMount() {
       console.log("drawChart componentDidMount");
        this.drawChart();
    }

    componentWillReceiveProps(next) {
        // console.log("drawChart componentWillReceiveProps");
        // console.log("next:" + JSON.stringify(next.historyData));
        // console.log("props:" + JSON.stringify(this.props.historyData));
        if(next.historyData !== this.props.historyData){
            console.log("drawChart componentWillReceiveProps");
            this.drawChart(next.historyData);
        }
    }


    cancelClock(){

        this.setState({
            selectshow: false,
        });
    }

    selectOneDay(){
        console.log(",,,,111");
        if(typeof this.props.selectOneDay === 'function'){
            this.props.selectOneDay();
        }
    }

    drawChart(datasource){
        var node = ReactDOM.findDOMNode(this.refs.main);
        var myChart = echarts.init(node);

        let dataArray = [];
        if(datasource){
            dataArray = datasource;
        }else if(this.props.historyData){
            dataArray = this.props.historyData;
        }
      //  let dataArray =  [0, 0, 0, 0, 0, 100, 0, 100, 0, 100, 0, ];
        if(dataArray && dataArray.length < 1){
            //console.log("dataArray 为空");
            dataArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }else{
            //console.log("dataArray:" + dataArray);
        }
        let maxData = dataArray[0];
        dataArray.map(function (value, index) {
            if(maxData < value){
                maxData = value;
            }
        });


        var option = {

            // title: {
            //     show:true,
            //     text:'室内空气PM2.5走势图',
            //     textStyle:{
            //         color:'#FFF',
            //         fontsize:10,
            //     }
            // },
            animtion:false,
            tooltip: {
                trigger: 'axis',
                padding:5,
                confine:'true',
                formatter: function (params, ticket, callback) {
                    let slectData = params[0];
                    return  slectData.name.toString()  + " "+ slectData.data.toString() + 'ug/m³';
                },
                backgroundColor:'rgba(255,255,255,1)',
                textStyle:{
                    color:'rgba(56,173,255,1)',
                    fontSize:11
                },
                axisPointer:{
                    animation:false,
                    lineStyle:{
                        color: 'rgba(255,255,255,1)',
                    }
                },
                transitionDuration:0,
                triggerOn: 'click',

            },

            grid:{
                left:'1%',
                right:'1%',
                bottom:'6%',
                top:'6%',
                containLabel:true,
                show:true,
                borderWidth:0,
            },
            xAxis:  {
                type: 'category',
                boundaryGap: true,
                axisTick:{
                    show:false
                },
                axisLabel:{
                    textStyle:{
                        color:'rgba(255,255,255,1)',
                    }
                },
                axisLine:{
                    show:false,
                },
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
               // data: powerTime||[]

            },
            yAxis: {
                type: 'value',
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    formatter: '{value}',
                    textStyle:{
                        color:"#FFF"
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'rgba(255,255,255,0.3)',
                    }
                }
            },
            series: [
                {
                    name:'',
                    type:'line',
                    smooth: true,
                    itemStyle:{
                      normal:{
                          color:'#FFF'
                      }
                    },
                    markLine:{
                        animation:false,
                        label:{
                            normal:{
                                formatter:{
                                    color:'#FFF'
                                }
                            }
                        }
                    },
                    markPoint:{
                        animation:false,
                    },
                    effect:{color:'#0ff'},
                   // data: [10, 12, 10, 13, 15, 12, 14, 15, 10, 16, 16, 12, 10, 12, 10, 15, 10, 10, 12, 10, 10, 10, 10, 15]
                    data: dataArray,
                    lineStyle:{  // 折线的颜色
                        normal:{
                            color:'rgba(255,255,255,1)',
                        }
                    },
                    hoverAnimation:false,

                    //data: powerValue||[]
                }
            ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }



    // style={{width: '90%', height: '50%', paddingLeft:'5%'}}
    render() {

        let show = this.props.show || false;
        let timeToSelect =  this.props.selectOneDayOnMonth || todayTimeStr;

      //  console.log("airStatePage render");

        return (<div className={"airStatePage " + (show ? "slide-up" :"slide-down")} >
            <div style={{paddingTop: (isIOS? "72px":"81px")}}>
                <div className="airPage_downButton"  onTouchStart={this.hiddenAction.bind(this)}>
                   <img src="../static/image/appmain/arrow_down.png"/>
                </div>
                <div className="chartTitle">
                    <div className=" chartAirTitle" onTouchStart={this.selectOneDay.bind(this)} >室内空气PM2.5走势图</div>
                    <div className=" timeSelectBtn" onTouchStart={this.selectOneDay.bind(this)}>
                        <img src="../static/image/appmain/timeSelectMonth.png"/>
                        <span>{timeToSelect}</span>
                        <img src="../static/image/appmain/timeSelectMonthDown.png"/>
                    </div>
                </div>
                <div className="echart_main">
                    <div ref="main" className="flex " style={{width: '90%', height: halfHeight, paddingLeft:'5%', paddingTop:'-5%',}}  >
                    </div>
                </div>
            </div>
        </div>);
    }

};
