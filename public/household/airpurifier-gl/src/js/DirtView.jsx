import React , {Component} from 'react';

let wave_width = 500;
const wave_angle = 10;
const wave_height = 15; // 浪的峰值

let   ismoveout = false;

let draPoint = [];
let drawTimer ;

export class DirtView extends Component {
    constructor(props){
        super(props);
        this.status = {
            flag: 0,
            step: 0,
            midleColor: "rgba(247, 228, 123,",
            goodColor:"rgba(255, 255, 255,",
            badColor:"rgba(255, 134, 134,",
        };
        console.log("child constructor");

        wave_width = window.screen.width ;
    }

    componentDidMount() {
         this.drawDirt(this.props.airStatus);
    }

    componentWillReceiveProps(next) {
        console.log("receive next " + next.airStatus);
        if(next.airStatus != this.props.airStatus){
            console.log("redraw receive next " + next.airStatus);
            this.drawDirt(next.airStatus);
        }
    }


    drawDirt(airStatus){

        var canvas = document.getElementById('air_canvas');
        var context = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var initNumPoint = 30;
        var originX =  width / 2;
        var originY = height / 2;

        if(drawTimer){
            clearInterval(drawTimer);
        }

        function clear() {
            // context.strokeStyle = "rgba(255, 255, 255, 0)";
            // context.fillStyle = "rgba(255, 255, 255, 0)";
            // context.fillRect(0, 0, canvas.width, canvas.height);
            context.clearRect(0,0,width * 1.2,height *1.2);
        }
        clear();

        var airStatus = airStatus || "good";
        console.log("receive next " + airStatus);


        function getRandomPoints(num){
            for (var i = num; i >= 0; i--) {
                var point = getRandomPoint();
                draPoint.push(point);
            };
            return draPoint;
        }

        function getRandomPoint(){
            var x = Math.floor( Math.random() * width );
            var y = Math.floor( Math.random() * height );

            var point = {
                x: x - originX,
                y: y - originY,
                count: 0,
            };
            return point;
        }

        function getRandomOneMorePoint(){
            var x = Math.floor( Math.random() * width);
            var y = Math.floor( Math.random() * height);

            var point = {
                x: x - originX,
                y: y - originY,
                count: 0,
            };
            return point;
        }

        function getRandomHalfPoint(){
            var x = Math.floor( Math.random() * width * 0.5);
            var y = Math.floor( Math.random() * height* 0.5 );

            var point = {
                x: x - originX * 0.5,
                y: y - originY * 0.5,
                count: 0,
            };
            return point;
        }

        var points = getRandomPoints(initNumPoint);

        let speed = 100;
        let radiusDirt = 4;
        var colorStr = this.status.goodColor;
        if(airStatus == "bad"){
            colorStr = this.status.badColor;
            ismoveout = false;
            speed = 1000/60;
        }else if(airStatus == "fine"){
            colorStr = this.status.midleColor;
            ismoveout = false;
            speed = 1000/60;
            radiusDirt = 3;
        }else{
            colorStr = this.status.goodColor;
            ismoveout = true;
            speed = 1000/60;
        }

        function drawPoints(pointsToDraw, color, radiusMode) {
            clear();

            var arrayLength = pointsToDraw.length;
            for (var i = 0; i < arrayLength; i++) {

                var alpha = (i % 10) * 0.1;
                var radius = Math.floor(i % radiusMode) ;

                radius = radius > 1 ? radius : 1;
                context.beginPath();
                //context.fillStyle = color+ alpha + ")";
                //context.strokeStyle = color+ alpha + ")";

                var randomx = pointsToDraw[i].x;
                var randomy = pointsToDraw[i].y;
                var countPoint = pointsToDraw[i].count;
                if(ismoveout){
                    countPoint--;
                }else{
                    countPoint++;
                }

                var pointMoveCount =  countPoint;
                pointsToDraw[i].count =  countPoint;
                var arc = Math.atan(randomx/randomy);

                var xpoint = 0;
                var ypoint = 0;

                let movePx = 2;
                if(randomx > 0 && randomy > 0){
                    xpoint =  pointsToDraw[i].x - movePx * pointMoveCount * Math.sin(arc)+ originX;
                    ypoint = pointsToDraw[i].y - movePx * pointMoveCount * Math.cos(arc)+ originY;
                }
                else
                if( randomx > 0 &&randomy < 0){
                    xpoint =  pointsToDraw[i].x + movePx * pointMoveCount* Math.sin(arc)+ originX;
                    ypoint = pointsToDraw[i].y + movePx * pointMoveCount * Math.cos(arc)+ originY;
                }
                else
                if(randomx < 0 && randomy > 0){
                    xpoint =  pointsToDraw[i].x - movePx * pointMoveCount* Math.sin(arc)+ originX;
                    ypoint = pointsToDraw[i].y - movePx * pointMoveCount* Math.cos(arc) + originY;
                }
                else
                if (randomx < 0 && randomy < 0){
                    xpoint =  pointsToDraw[i].x + movePx * pointMoveCount* Math.sin(arc)+ originX;
                    ypoint = pointsToDraw[i].y + movePx * pointMoveCount* Math.cos(arc) + originY;
                }

                context.arc(xpoint,ypoint , radius, 0, Math.PI * 2, true);
                context.fillStyle = color+ alpha + ")";
                context.fill();
                context.closePath();

                if(ismoveout){
                    if(Math.abs(xpoint) >  width * 1.1 || Math.abs(ypoint ) > height * 1.1 || Math.abs(xpoint) < 0.1 || Math.abs(ypoint) < 0.1 ){
                        let newpoint =  getRandomHalfPoint();
                        draPoint.splice(i, 1, newpoint);
                        //console.log(" new x: " + newpoint.x + " y:" + newpoint.y + " old x:" + xpoint + " y:" + ypoint);
                    }
                }else{
                    if( Math.abs(xpoint - originX) < 50 && Math.abs(ypoint - originY)< 50 ){
                        let newpoint =  getRandomOneMorePoint();
                        draPoint.splice(i, 1, newpoint);
                       // console.log(" new x: " + newpoint.x + " y:" + newpoint.y + " old x:" + xpoint + " y:" + ypoint);
                    }
                }
            }
            //draPoint = drawPointArray;
        }

        drawTimer = setInterval(function () {
            drawPoints(points, colorStr, radiusDirt);
        },speed);
    }


    render(){

        return  (
                <canvas className="dirt_image" id="air_canvas" width={wave_width} height={wave_width}>

                </canvas>
            );

    }
};
