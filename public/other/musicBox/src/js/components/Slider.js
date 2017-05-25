
export class Slider extends React.Component{
    constructor(props){
        super(props);

        this.textOriginLeftPos = 0;
        this.potOriginLeftPos = 0;
        this.sliderBarWidth = 0;
        this.sliderOrginX = 0;
    }

    touchStart(e){
        this.spos = e.changedTouches[0];
        this.canMove = true;
        this.first = true;
    }

    touchEnd(e){
        if(!this.canMove) return;
        let x = e.changedTouches[0].pageX - this.sliderOrginX;
        if(x > 0){
            let value = parseInt(x/this.sliderBarWidth*this.props.max);
            value = value>this.props.max?this.props.max:value;
            console.log("touch value: " + value);
            this.pos(value)
            if(typeof this.props.changeValue === "function"){
                this.props.changeValue(value);
            }
        }
    }

    touchMove(e){
        if(this.first){
            this.first = false;
            // 向上滑动
            if(Math.abs(this.spos.pageY - e.changedTouches[0].pageY) > Math.abs(this.spos.pageX - e.changedTouches[0].pageX))
                this.canMove = false;
        }
        if(!this.canMove) return;
        let x = e.changedTouches[0].pageX - this.sliderOrginX;
        if(x > 0){
            let value = parseInt(x/this.sliderBarWidth*this.props.max);
            value = value>this.props.max?this.props.max:value;
            console.log("touch value: " + value);
            this.pos(value)
            if(typeof this.props.changeValue === "function"){
                this.props.changeValue(value);

            }
        }
    }

    componentDidMount(){

        let valueBarDom = this.refs.valueBar;
        let sliderPotDom = this.refs.sliderPot;

        this.potOriginLeftPos = sliderPotDom.offsetLeft;

        this.sliderBarWidth = this.refs.sliderBar.offsetWidth - sliderPotDom.offsetWidth;
        let value = parseInt(this.props.value);
        this.pos(value);

        this.sliderOrginX = this.refs.sliderBar.offsetLeft+sliderPotDom.offsetWidth/2;
    }
    componentDidUpdate(){
        this.pos(this.props.value);
    }
    /**
     * 根据只算出左边进度条和原点的位置
     */
    pos(value){
        let valueBarDom = this.refs.valueBar;
        let sliderPotDom = this.refs.sliderPot;

        valueBarDom.style.width = value*this.sliderBarWidth/parseInt(this.props.max) + "px";

        sliderPotDom.style.left = this.potOriginLeftPos + parseInt(valueBarDom.style.width) + "px";

    }
    /* 将秒数转化为 hh:mm:ss 格式 */
    formatSecond(a){
        if(a < 0) return '';

        var hh = parseInt(a/3600),
            mm = parseInt(a%3600/60),
            ss = parseInt(a%60);  

        return (hh>0?(this.format(hh) + ":"):'') + this.format(mm) + ":" + this.format(ss);  
    }

    /* 个位数时，十位补0 */
    format(d) {
        return d >= 10 ? d : ("0"+d);
    }

    render(){
        var total, currTime;
        currTime = this.formatSecond(this.props.value);
        total = this.formatSecond(this.props.max);
        return(
            <div className="sliderContainer">
                <div className="sliderContainer_container">
                    <div className='txt_wrap'><span className='txt_left'>{currTime}</span><span className='txt_right'>{total}</span></div>
                    <div className="fakeBar"></div>
                    <div className="touchTap" onTouchStart={this.touchStart.bind(this)} onTouchEnd={this.touchEnd.bind(this)} onTouchMove={this.touchMove.bind(this)}>
                    <input type="range" min={this.props.min} max={this.props.max}  className="sliderBar" ref="sliderBar"/>
                </div>

                    <div className="valueBar" ref="valueBar"></div>
                    <span className="sliderPot" ref="sliderPot"></span>
                </div>
            </div>
        );
    }
}
