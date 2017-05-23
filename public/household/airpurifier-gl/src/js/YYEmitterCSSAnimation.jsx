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
export class YYEmitterCSSAnimation extends Component {
    constructor(props){
        super(props);
        this.status = {
            flag: 0,
            step: 0,
        };

        pixration = getPoxelRation();
        wave_width = window.screen.width;
        wave_height = window.screen.height*0.65;
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

    cssEmitterAnimation(direction, grainColor) {

        let movedirection = direction || "output";
        let movePointColor = grainColor || "#fff";
        var layers = 1;
        var starsPerLayer = 20;
        var renderLayers = function () {
            var containerLayer = document.getElementById("EmitterCSSAnimationContainer");
            containerLayer.innerHTML = "";

            for (var i = 0; i < layers; i++) {
                var newLayer = document.createElement('div');
                newLayer.style.width = wave_width+"px";
                newLayer.style.height = wave_height+"px";

                if (movedirection == "input") {
                    newLayer.classList.add('layerscale');
                } else {
                    newLayer.classList.add('layerzoom');
                }
                populateParticles(starsPerLayer, newLayer);
                containerLayer.appendChild(newLayer);
            }
        }


        var populateParticles = function (amt, container) {
            draPoint = [];
            for (var i = 0; i < amt; i++) {
                // var el = document.createElement('div');
                // el.classList.add('star');
                var top = Math.floor(Math.random() * wave_width);
                var left = Math.floor(Math.random() * wave_width);

                var point = {
                    x: top,
                    y: left,
                    color: "rgba(255,255,0,1)"
                };
                draPoint.push(point);
                // el.style.top = top + 'px';
                // el.style.left = left + 'px';
                // el.style.backgroundColor =   movePointColor;
            }

            var canvas =  drawPointInLayer(draPoint,  3);
            canvas.id = "YYEmitterLayerCanvas" ;
            canvas.style.width = wave_width + "px";
            canvas.style.height =  wave_height + "px";
            container.appendChild(canvas);
        }

        var drawPointInLayer = function drawPoints(pointsToDraw, radiusMode) {

                      var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');

            canvas.width = wave_width;
            canvas.height = wave_height;
            canvas.style.position = "absolute";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.width = wave_width*pixration + "px";
            canvas.style.height =  wave_height*pixration + "px";

            var arrayLength = pointsToDraw.length;
            for (var i = 0; i < arrayLength; i++) {

                var alpha = (i % 10) * 0.1;
                var radius = Math.floor(i % radiusMode);

                radius = radius > 1 ? radius : 1;
                context.beginPath();
                //context.fillStyle = color+ alpha + ")";
                //context.strokeStyle = color+ alpha + ")";

                var randomx = pointsToDraw[i].x;
                var randomy = pointsToDraw[i].y;
                var xpoint = randomx;
                var ypoint = randomy;
                let color = pointsToDraw[i].color;

                context.arc(xpoint, ypoint, radius, 0, Math.PI * 2, true);
                context.fillStyle = color + alpha + ")";
                context.fill();
                context.closePath();

            }
            //draPoint = drawPointArray;

            return canvas;
        }

        renderLayers();
    }



    render(){

        let sytle = {width:wave_width, height:wave_height};
        return  (
            <div  className="EmitterCSSAnimationContainer" id="EmitterCSSAnimationContainer" >
                {/*<div className="layerzoom" style={sytle}>*/}

                {/*</div>*/}
            </div>
            // <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>
            //
            // </canvas>
        );

    }
};
