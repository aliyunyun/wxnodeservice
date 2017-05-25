'use strict';
/**
 * 时间选择组件
 * @prop {boolean} show  时间选择组件是否显示(默认为false)
 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
 * @prop {string} title  时间组件的标题(默认为设置时间)
 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
 * @prop {number} hourstep  小时的间隔(默认为1)
 * @prop {number} minutestep 分钟的间隔(默认为1)
 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
 * @prop {number} maxhour 可选的最大小时(默认值为23)
 * @prop {number} minhour 可选的最小小时(默认值为0)
 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
 * @author   xinglin
 */

export const TimeSelect = React.createClass({
	getInitialState: function(){
        return {
        	hourtime:0,
        	minutetime:0,
        	secondtime:0,
        	hourindex:0,
        	hourarr:[],
        	minuteindex:0,
        	minutearr:[],
        	secondindex:0,
        	secondarr:[],
        	showOpacity:1,
        	timeDisplay:false,
        };
	},
	componentDidMount: function() {
		//初始化时间可选值数组
		this.timearrInit(this.props);
	},
	timearrInit:function(next){
		//设置时间可选值数组
		let maxhour = parseInt(next.maxhour)  || 23;
		let minhour = parseInt(next.minhour)  || parseInt(this.state.hourtime) || 0;
		let hourstep = parseInt(next.hourstep)  || 1;
		let maxlength = parseInt((maxhour-minhour)/hourstep);
		let hourarr = [];
		if(next.hourarray && next.hourarray instanceof Array){
			hourarr = next.hourarray;
			this.setState({
				hourarr:hourarr,
				hourtime:minhour
			});
		}else{
			for(let i = 0;i<=maxlength;i++){
				let value = minhour+i*hourstep;
				// value = value<10?'0'+value:value;
				hourarr.push(value);
			}
			// maxhour = maxhour<10?'0'+maxhour:maxhour;
			if(hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
			this.setState({
				hourarr:hourarr,
				hourtime:minhour
			});
		}
		//设置默认小时
		if(next.defaulthour || this.state.hourtime){
			let value = next.defaulthour===undefined? this.state.hourtime:next.defaulthour;
			let index = hourarr.indexOf(next.defaulthour);
			if(index!=-1){
				this.setState({
					hourtime: value,
					hourindex:index
				});
			}
		}

		let maxminute = parseInt(next.maxminute) || 59;
		let minminute = parseInt(next.minminute)  || 0;
		let minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
		let maxlength2 = parseInt((maxminute-minminute)/minutestep);
		let minutearr = [];
		if(next.minutearray && next.minutearray instanceof Array){
			minutearr = next.minutearray;
			this.setState({
				minutearr:minutearr,
				minutetime:minminute
			});
		}else{
			for(let j = 0;j<=maxlength2;j++){
				let value = minminute+j*minutestep;
				// value = value<10?'0'+value:value;
				minutearr.push(value);
			}
			// if(maxminute<10) maxminute = '0'+maxminute;
			if(minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			this.setState({
				minutearr:minutearr,
				minutetime:minminute
			});
		}
		//设置默认分钟
		if(next.defaultminute || this.state.minutetime){
			let value = next.defaultminute===undefined? this.state.minutetime:next.defaultminute;
			let mindex = minutearr.indexOf(value);
			if(mindex!=-1){
				this.setState({
					minutetime: value,
					minuteindex:mindex
				});
			}
		}

		let maxsecond = parseInt(next.maxsecond) || 59;
		let minsecond = next.secondarray[0] || parseInt(next.minsecond) || 0;
		let secondstep = parseInt(next.secondstep) || parseInt(this.props.secondstep) || 1;
		let maxlength3 = parseInt((maxsecond-minsecond)/secondstep);
		let secondarr = [];
		if(next.secondarray && next.secondarray instanceof Array){
			secondarr = next.secondarray;
			this.setState({
				secondarr:secondarr,
				secondtime:minsecond
			});
		}else{
			for(let k=0;k<=maxlength3;k++){
				let value = minsecond+k*secondstep;
				// value = value<10?'0'+value:value;
				secondarr.push(value);
			}
			// if(maxsecond<10) maxsecond = '0'+maxsecond;
			if(secondarr.indexOf(maxsecond) == -1) secondarr.push(maxsecond);
			this.setState({
				secondarr:secondarr,
				secondtime:minsecond
			});
		}
		//设置默认秒
		if(next.defaultsecond || this.state.secondtime){
			let value = next.defaultsecond === undefined ? this.state.secondtime : next.defaultsecond;
			let secondindex = secondarr.indexOf(value);
			if(secondindex != -1){
				this.setState({
					secondtime: value,
					secondindex: secondindex
				});
			}
		}
	},
	componentWillReceiveProps: function(next) {
		//更新时间可选值数组
		if(next.hourstep!=this.props.hourstep || next.minhour!=this.props.minhour || next.ArrayInit===true
			|| next.maxhour!=this.props.maxhour  || next.maxminute!=this.props.maxminute || next.maxsecond != this.props.maxsecond
			|| next.defaulthour != this.props.defaulthour || next.defaultminute != this.props.defaultminute || next.defaultsecond != this.props.defaultsecond){
			this.timearrInit(next);
		}
		var showOpacity = this.state.showOpacity;
		if(next.show != this.props.show){
			if(next.show == true){
				this.setState({timeDisplay:true});
			}else if(next.show == false){
				this.setState({timeDisplay:false});
			}
		}
	},
	startrange:function(e){
		//开始滑动时间刻度 记录初始坐标值
		e.stopPropagation();
		e.preventDefault();
		let yvalue = parseInt(e.touches[0].clientY);
		this.setState({
			oldy: yvalue
		});
	},
	moverange:function(e){
		//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
		e.stopPropagation();
		e.preventDefault();
		let yvalue = parseInt(e.touches[0].clientY);
		let oldy = parseInt(this.state.oldy);
		let value = (yvalue-oldy)/1.72;
		if(value>20) value=20;
		if(value<-20) value=-20;
		let type = e.target.getAttribute('data-type');
		if(type=='hour'){
			this.setState({
				newy: yvalue,
				hourtop:value
			});
		}
		if(type=='minute'){
			this.setState({
				newy: yvalue,
				minutetop:value
			});
		}
		if(type=='second'){
			this.setState({
				newy: yvalue,
				secondtop:value
			});
		}
	},
	endrange:function(e){
		//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
		e.stopPropagation();
		e.preventDefault();
		let newy = parseInt(this.state.newy);//滑动结束时的y值
		let oldy = parseInt(this.state.oldy);//滑动开始时的y值
		let hour = parseInt(this.state.hourtime);//上一次选中的小时值
		let hourarr = this.state.hourarr;//小时可选值数组
		let hourindex = parseInt(this.state.hourindex);//上次选中的小时值对应数组中索引
		let minutearr = this.state.minutearr;//分钟可选值数组
		let minuteindex = parseInt(this.state.minuteindex);//上次选中的分钟值对应数组索引
		let minute = parseInt(this.state.minutetime);//上次选中的分钟值
		let second = parseInt(this.state.secondtime);//上次选中的秒数值
		let secondarr = this.state.secondarr;//秒数可选值数组
		let secondindex = parseInt(this.state.secondindex);//上次选中的秒数值对应数组中的索引
		let hourstep = parseInt(this.props.hourstep) || 1;//小时的间隔
		let minutestep = parseInt(this.props.minutestep) || 1;//分钟的间隔
		let secondstep = parseInt(this.props.secondstep) || 1;//秒数的间隔
		let maxhour = parseInt(this.props.maxhour) || 23;//设置的最大小时值
		let minhour = parseInt(this.props.minhour) || 0;//设置的最小小时值
		let type = e.target.getAttribute('data-type');//滑动更改的类型
		//小时减小
		if(newy-oldy>20 && type=='hour'){
			let rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
			hourindex = hourindex-rangestep;
			hourindex = hourindex<0?0:hourindex;
			hour = hourarr[hourindex];
			this.setState({
				hourtime:hour,
				hourindex:hourindex,
				hourtop:0
			});
		};
		//小时增加
		if(newy-oldy<-20 && type=='hour'){
			let rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
			hourindex = hourindex+rangestep;
			hourindex = (hourindex>=hourarr.length)?(hourarr.length-1):hourindex;
			hour = hourarr[hourindex];
			this.setState({
				hourtime:hour,
				hourindex:hourindex,
				hourtop:0
			});
		};
		//分钟减小
		if(newy-oldy>20 && type=='minute'){
			let rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
			minuteindex = minuteindex-rangestep;
			minuteindex = minuteindex<0?0:minuteindex;
			minute = minutearr[minuteindex];
			this.setState({
				minutetime:minute,
				minuteindex:minuteindex,
				minutetop:0
			});
		};
		//分钟增加
		if(newy-oldy<-20 && type=='minute'){
			let rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
			minuteindex = minuteindex+rangestep;
			minuteindex = (minuteindex>=minutearr.length)?(minutearr.length-1):minuteindex;
			minute = minutearr[minuteindex];
			this.setState({
				minutetime:minute,
				minuteindex:minuteindex,
				minutetop:0
			});
		};
		//秒值减小
		if(newy-oldy>20 && type=="second"){
			let rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
			secondindex = secondindex - rangestep;
			secondindex = secondindex < 0 ? 0 : secondindex;
			second = secondarr[secondindex];
			this.setState({
				secondtime: second,
				secondindex: secondindex,
				secondtop: 0
			});
		};
		//秒值增加
		if(newy-oldy<-20 && type=="second"){
			let rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
			secondindex = secondindex+rangestep;
			secondindex = (secondindex>=secondarr.length)?(secondarr.length-1):secondindex;
			second = secondarr[secondindex];
			this.setState({
				secondtime:second,
				secondindex:secondindex,
				secondtop:0
			});
		}
		//重置为未拖动状态
		this.setState({
			hourtop:0,
			minutetop:0,
			secondtop:0
		});
	},
	endDefault:function(e){
		//阻止IOS上冒泡触发iscroll事件
		e.stopPropagation();
		e.preventDefault();
	},
	cancelclock:function(e){
		//取消选择
		if(typeof this.props.cancelClock === 'function'){
			this.props.cancelClock();
		}else{
			console.log('error:the cancel callback is not a function');
		}
	},
	submitclock:function(e){


		//确认提交时间
		if(typeof this.props.submitClock === 'function'){
			this.props.submitClock(this.state.hourtime,this.state.minutetime,this.state.secondtime);
		}else{
			console.log('error:the submit callback is not a function');
		}
		// 防止点透
		this.endDefault(e);
	},
	render: function() {
		let show = this.props.show || false;
		let maxhour = parseInt(this.props.maxhour) || 23;
		let minhour = parseInt(this.props.minhour) || 0;
		let hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow)===false ? false : true;
		let minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow)===false ? false : true;
		let secondshow = typeof this.props.secondshow !== 'undefined' && Boolean(this.props.secondshow)===false ? false : true;
		if(!hourshow && !minuteshow && !secondshow) hourshow = true;
		let hourstep = parseInt(this.props.hourstep) || 1;
		let minutestep = parseInt(this.props.minutestep) || 1;
		let secondstep = parseInt(this.props.secondstep) || 1;
		let selecttitle = '';
		let selecttitleShow = false;
		if(this.props.title) selecttitle = this.props.title;
		if(selecttitle){selecttitleShow = true;}else{selecttitleShow = false;}
		let statusname = this.props.statusname || '关闭';
		let hour = this.state.hourtime || '0';
		hour=parseInt(hour)>maxhour?maxhour:parseInt(hour);
		hour=hour<minhour?minhour:hour;
		let minute = this.state.minutetime || '0';
		minute=parseInt(minute)>59?59:parseInt(minute);
		minute=minute<0?0:minute;
		let second = this.state.secondtime || '0';
		second=parseInt(second)>59?59:parseInt(second);
		second=second<0?0:second;
		let hourtop = this.state.hourtop || 0;
		let minutetop = this.state.minutetop || 0;
		let secondtop = this.state.secondtop || 0;
		let hourarr = this.state.hourarr;
		let hourindex = parseInt(this.state.hourindex);
		let minutearr = this.state.minutearr;
		let minuteindex = parseInt(this.state.minuteindex);
		let secondarr = this.state.secondarr;
		let secondindex = parseInt(this.state.secondindex);
	    return (
	    	<section style={{display:this.state.timeDisplay?"block":"none"}} ref='timeSelect' className='timeSelect'>
		    	<section onTouchEnd={this.cancelclock} onTouchMove={this.endDefault} onTouchStart={this.endDefault}></section>
		        <section className="timeselect" onTouchMove={this.endDefault} style={{bottom:this.state.timeDisplay?"0":"-26rem"}}>
		        	<section className='selectbtn flex'>
		        		<span className='flex-cell' onTouchEnd={this.cancelclock}>取消</span>
		        		<span className='flex-cell' onTouchEnd={this.submitclock}>确定</span>
		        	</section>
		        	<section className="timedescription flex">
	        			<span className="hour-des">档位</span>
	        			<span className="minute-des">时间</span>
	        		</section>
		        	<section className='time'>
		        		<section data-type='hour' style={{width:minuteshow?'50%':'100%',display:hourshow?'inline-block':'none'}}
		        			onTouchStart={this.startrange} onTouchMove={this.moverange}
		        			onTouchEnd={this.endrange}  className='hour'>
		        		</section>
		        		<section  data-type='minute' style={{display:minuteshow?'inline-block':'none',width:hourshow?'50%':'100%',left:hourshow?'50%':'0%'}}
		        			onTouchStart={this.startrange} onTouchMove={this.moverange}
		        			onTouchEnd={this.endrange} className='minute'>
		        		</section>
		        		<section className='timetext'>
		        			<span className='hour' style={{left:minuteshow?28+'%':53+'%',display:hourshow?'inline-block':'none'}}>档</span>
		        			<span className='minute' style={{display:minuteshow?'inline-block':'none',left:hourshow?78+'%':53+'%'}}>秒</span>
		        			<span className='status'>{statusname}</span>
		        		</section>
		        		<section className='hourvalue flex-column' style={{top:hourtop+'%',left:minuteshow?23+'%':60+'%',display:hourshow?'':'none'}}>
		        			<span className={(hourindex-3)<0?'line4':'line1'}>{(hourindex-3)<0?'':hourarr[hourindex-3]}</span>
		        			<span className={(hourindex-2)<0?'line4':'line1'}>{(hourindex-2)<0?'':hourarr[hourindex-2]}</span>
		        			<span className={(hourindex-1)<0?'line4':'line2'}>{(hourindex-1)<0?'':hourarr[hourindex-1]}</span>
		        			<span className='line3'>{hourarr[hourindex]}</span>
		        			<span className={(hourindex+1)>=hourarr.length?'line4':'line2'}>{(hourindex+1)>=hourarr.length?'':hourarr[hourindex+1]}</span>
		        			<span className={(hourindex+2)>=hourarr.length?'line4':'line1'}>{(hourindex+2)>=hourarr.length?'':hourarr[hourindex+2]}</span>
		        			<span className={(hourindex+3)>=hourarr.length?'line4':'line1'}>{(hourindex+3)>=hourarr.length?'':hourarr[hourindex+3]}</span>
		        		</section>
		        		<section  className='minutevalue flex-column' style={{top:minutetop+'%',display:minuteshow?'':'none',left:hourshow?70+'%':50+'%'}}>
			        		<span className={(minuteindex-3)<0?'line4':'line1'}>{(minuteindex-3)<0?'':minutearr[minuteindex-3]}</span>
		        			<span className={(minuteindex-2)<0?'line4':'line1'}>{(minuteindex-2)<0?'':minutearr[minuteindex-2]}</span>
		        			<span className={(minuteindex-1)<0?'line4':'line2'}>{(minuteindex-1)<0?'':minutearr[minuteindex-1]}</span>
		        			<span className='line3'>{minutearr[minuteindex]}</span>
		        			<span className={(minuteindex+1)>=minutearr.length?'line4':'line2'}>{(minuteindex+1)>=minutearr.length?'':minutearr[minuteindex+1]}</span>
		        			<span className={(minuteindex+2)>=minutearr.length?'line4':'line1'}>{(minuteindex+2)>=minutearr.length?'':minutearr[minuteindex+2]}</span>
		        			<span className={(minuteindex+3)>=minutearr.length?'line4':'line1'}>{(minuteindex+3)>=minutearr.length?'':minutearr[minuteindex+3]}</span>
		        		</section>
		        	</section>
		        	<section className='selecttitle' style={{display:selecttitleShow?'block':'none'}}>
		        		<span className='title'>{selecttitle}</span>
		        	</section>
		        </section>
	        </section>
	    );
	}
});