import React , {Component} from 'react';


let wave_width = 500;
const wave_angle = 10;
let wave_height = 15; // 浪的峰值

let   ismoveout = false;

let draPoint = [];
let drawTimer ;
// direction   方向         "input"  "output"
// grainColor  例子颜色     "rgba(255,255,255,1)"
export class EmitterCSSAnimation extends Component {
    constructor(props){
        super(props);
        this.status = {
            flag: 0,
            step: 0,
        };


        wave_width = window.screen.width;
        wave_height = window.screen.height * 0.65;
    }

    componentDidMount() {
        // let innerPM25Value = this.props.innerPM25Value || 0;
        // this.drawDirt(innerPM25Value);

        this.cssEmitterAnimation(this.props.direction, this.props.grainColor);
    }

    componentWillReceiveProps(next) {
        console.log("receive next " + next.moveStyle);
        if(next.direction != this.props.direction || next.grainColor != this.props.grainColor){
            this.cssEmitterAnimation(next.direction,  next.grainColor);
        }
    }

    cssEmitterAnimation(direction, grainColor){

        let movedirection  = direction || "output";
        let movePointColor  = grainColor || "#fff";
        var layers = 6;
        var starsPerLayer = 80;
        var renderLayers = function() {
            var containerLayer = document.getElementById("EmitterCSSAnimationContainer");
            containerLayer.innerHTML="";

            for (var i = 0; i < layers; i++) {
                var newLayer = document.createElement('div');
                newLayer.style.width = wave_width;
                newLayer.style.height = wave_height;
                if(movedirection == "input"){
                    newLayer.classList.add('layerscale');
                }else{
                    newLayer.classList.add('layerzoom');
                }
                populateParticles(starsPerLayer, newLayer);
                containerLayer.appendChild(newLayer);
            }
        }


        var populateParticles = function(amt, container) {
            for (var i = 0; i < amt; i++) {
                var el = document.createElement('div');
                el.classList.add('star');
                var top = Math.floor(Math.random() * wave_width);
                var left = Math.floor(Math.random() * wave_width);
                el.style.top = top + 'px';
                el.style.left = left + 'px';
                el.style.borderRadius=1+'px';
                el.style.width=2+'px';
                el.style.height=2+'px';
                el.style.backgroundColor =   movePointColor;
                container.appendChild(el);
            }
        }

        renderLayers();
    }



    render(){

        let sytle = {width:wave_width, height:wave_height};
        return  (
            <div  className="EmitterCSSAnimationContainer" id="EmitterCSSAnimationContainer" style={sytle}>
                {/*<div className="layerzoom" style={sytle}>*/}

                {/*</div>*/}
            </div>
            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
            //
            // </canvas>
        );

    }
};
