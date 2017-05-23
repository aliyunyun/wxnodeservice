import React , {Component} from 'react';
import {getPoxelRation} from './RequestAction.jsx';

let wave_width = 500;
const wave_angle = 10;
let wave_height = 15; // 浪的峰值

let   ismoveout = false;
let pixration = 2;
let draPoint = [];
let drawTimer ;
// direction   方向         "input"  "output"
// grainColor  例子颜色     "rgba(255,255,255,1)"
export class YYImageAnimation extends Component {
    constructor(props){
        super(props);
        this.status = {
            flag: 0,
            step: 0,
        };

        pixration = getPoxelRation();
        wave_width = window.screen.width;
        wave_height = window.screen.width;
    }

    componentDidMount() {

    }



    render(){

        let sytle = {width:wave_width, height:wave_height};
        return  (
            <div  className="YYImageAnimation" id="EmitterCSSAnimationContainer" >
                {/*<div className="layerzoom" style={sytle}>*/}

                {/*</div>*/}
            </div>
            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
            //
            // </canvas>
        );

    }
};
