import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

export class Rule extends BaseComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        het.setTitle('游戏规则');
    }
    render() {
        return <section className='borderBox borderShadow'>
        <div className='content'>
            <div > 
                <p>游戏规则如下：</p>
                <p>游戏开始后，所有参与游戏的智能酒杯会随机闪烁起灯光，数秒后所有酒杯灯光熄灭，随后亮起的酒杯主人将是最后的“幸运儿”，用你们认为最有趣的方式去惩罚ta吧，公众号中也会有惩罚手段的建议供您参考哦。</p>
            </div>
            <img src='../static/img/ic-rule.png' alt='游戏规则'/>
        </div> 
        </section>;
    }
}
