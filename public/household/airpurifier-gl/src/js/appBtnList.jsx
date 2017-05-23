/**
 * Created by yuanyunlong on 16/11/24.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {};

het.domReady(()=>{
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
        filter : {}
    });
});
het.repaint((data)=>{
    Actions.repaint(data);
});

var lastTouchModeIndex = 0;
let WorkModeArray = ['待机','自动', '低速', '中速','高速','睡眠','取消睡眠'];

class App extends BaseComponent {
    constructor(props){
        super(props);

        this.state = {
            onLinestatue: true,
            online:'1',
            networkavailable:'1'

        };

        Store.listen((data)=>{
            if(!this.isMounted(this)) return;
            this.setState(data);
        }); // 监听Store
    }

    isMounted(component){
        try {
            ReactDOM.findDOMNode(component);
            return true;
        }catch (e){
            return false;
        }
    }


    modeAction(){
        let currentModeIndex = this.state.WorkModeValue || 2;
        Actions.setMondeAction(currentModeIndex);

    }

    ioModeAction(){
        let currentSate = this.state.IonizerState;
        Actions.setIonizerAction(currentSate);

    }
    UVModeAction(){
        let currentSate = this.state.UvState;
        Actions.setUvAction(currentSate);
    }

    closeAction(){
        let currentChildValue = this.state.WorkModeValue || 1;
        Actions.setSwitchStateAction(currentChildValue);

    }

    render(){

        let modeIndex = (this.state.WorkModeValue || 2) ; // 工作模式 2 - 5
        let childLockValue = (this.state.ChildLockState || 1) == 2;  // true 童锁打开
        let switchLockValue  = (this.state.WorkModeValue || 1) == 1 ; // ==1 表示在待机，没有工作
        let UvStateState = (this.state.UvState || 2) == 1;
        let IonizerState = (this.state.IonizerState || 2) == 1;

        let selectedColor = "selected";
        let unSelectedColor = "unselected";
        let switchColor =  unSelectedColor;
        let workmode =    unSelectedColor ;
        let IonozerClassName = ( IonizerState ) ? selectedColor :  unSelectedColor;
        let UVstateClassName = (  UvStateState) ? selectedColor :  unSelectedColor;

        let modeName = "童锁";
        let buttonWorkName = "自动";
        let modeImagePath = "../static/image/main/main_mode_2.png";

        let switchMode = "关机";
        let switchTitle = "开机";
        if(!switchLockValue){
            switchMode = "工作中";
            switchTitle = "关机";

            if(modeIndex > 1 && modeIndex < 7){
                modeName = WorkModeArray[modeIndex - 1];
                buttonWorkName =   WorkModeArray[modeIndex - 1];
                modeImagePath = "../static/image/main/main_mode_" + modeIndex + ".png";
            }

            if(childLockValue){
                modeName = "童锁";
                switchColor = selectedColor;
                workmode =  selectedColor;
                IonozerClassName =  selectedColor;
                UVstateClassName =  selectedColor;
            }
        }else{
            // 关机
            modeName = "无";
        }

        if(switchLockValue){
            switchColor = unSelectedColor;
            workmode =  selectedColor;
            IonozerClassName =  selectedColor;
            UVstateClassName =  selectedColor;
        }


        let statusBar = switchMode + ' 模式:'+modeName;
        if(this.state.online == '2')  {
            statusBar='设备已离线';
            workmode =  selectedColor;
            switchColor = selectedColor;
            IonozerClassName =  selectedColor;
            UVstateClassName =  selectedColor;
        }

       if(this.state.networkavailable == '2')  {statusBar='当前网络不可用';}
        console.log("render mode1: " + modeIndex + " " + statusBar + ' ' + appData.online);


        return (<div>
            <h1 className="btn-title">{statusBar}</h1>
            <section className="flex btn-list">
                <dl className={"flex-cell" }  key="0" data-index="0" onTouchStart={this.closeAction.bind(this)}>
                    <dd className={switchColor}><img src="../static/image/main/main_switch.png"/></dd>
                    <dt className={switchColor}><p >{switchTitle}</p></dt>
                </dl>
                <dl className={"flex-cell"} key="1" data-index="1" onTouchStart={this.modeAction.bind(this)}>
                    <dd className={workmode} ><img src={modeImagePath}/></dd>
                    <dt className={workmode}><p >{buttonWorkName}</p></dt>
                </dl>
                <dl className={"flex-cell"} key="2" data-index="2" onTouchStart={this.ioModeAction.bind(this)}>
                    <dd className={IonozerClassName}> <img src="../static/image/main/main_Io_mode.png"/></dd>
                    <dt className={IonozerClassName}><p >负离子</p></dt>
                </dl>
                <dl className="flex-cell" key="3" data-index="3" onTouchStart={this.UVModeAction.bind(this)}>
                    <dd className={UVstateClassName}><img src="../static/image/main/main_uv.png"/></dd>
                    <dt className={UVstateClassName}><p >紫外灯</p></dt>
                </dl>
            </section>
        </div>);
    }
}

het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});