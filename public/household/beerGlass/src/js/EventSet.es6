/**
 * 活动设置组件
 * @props.params {number} activityType 活动类型
 * @props.params {number} lightType 灯光类型索引
 * @props.params {number} winNum 中奖人数
 * @author pan
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

export class EventSet extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle('设置');
        this.state = {
            showLight:false,
            lightIndex:props.params.lightType,
            winnersNum:props.params.winNum,
            activityType:props.params.activityType,
        };
        this.listenStore(Store); // 监听Store
    }
    lightSelect(e){
        var index = e.target.getAttribute('data-index'),data={};
        data.lightType = index;
        data.winNum = this.state.winNum;
        this.setState({lightIndex:index});
        Actions.ajax(data,'/activity/set');
    }
    showLight(e){
        this.setState({showLight:!this.state.showLight});
    }
    handleChange(e){
        let winnersNum = e.target.value,data={};
        data.lightType = this.state.lightType;
        data.winNum = winnersNum;
        this.setState({winnersNum: winnersNum});
        Actions.ajax(data,'/activity/set');
    }
    render() {
        let light = ['热情','温柔','欢快','互动'];
        return <section className='eventSet'>
            <ul className='set-ul'>
                <li onTouchTap={this.showLight.bind(this)}>
                    <span>灯光选择</span>
                    <span><i>{this.state.lightIndex?light[this.state.lightIndex-1]:''}</i><img src='../static/img/ic-arrow.png'/></span>
                </li> 
                <li>
                    <span>中奖人数</span>
                    <span><input type="tel" value={this.state.winnersNum?this.state.winnersNum:''} onChange={this.handleChange.bind(this)} /><img src='../static/img/ic-arrow.png'/></span>
                </li> 
            </ul>
            {
                this.state.showLight?
                <div>
                    <div className="shadow" onTouchTap={this.showLight.bind(this)}></div>
                    <ul className='mode-ul'>
                    {
                        light.map((item,index)=>{
                            return <li key={index} data-index={index+1} onTouchTap={this.lightSelect.bind(this)}><span>{item}</span><img className={this.state.lightIndex==index+1?'':'hidden'} src='../static/img/ic-checked.png'/></li>
                        })
                    }
                    </ul>
                </div>
                :''
            }
            
        </section>;
    }
}
