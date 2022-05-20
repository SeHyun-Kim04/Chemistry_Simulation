// 기본 초기화
var init=false;
var canvas;
var ctx;
var dx=5;
var dy=5;
var Running;

// 공의 갯수
var ball_max = 20;
var ballRadius = 4;
var balls=Array();

// 초기화
function Init(){
	if(init==false){
		canvas = document.getElementById("molecule");
		ctx = canvas.getContext("2d");
		for(var i=0;i<ball_max;++i){
            var obj = new Object();
			
			obj.x=Math.random()*canvas.width;
			obj.y=Math.random()*canvas.height;
			
			obj.xdir=1;
			obj.ydir=1;
			
			balls.push(obj);
		}
		init=true;
	}
}


function drawBall(x , y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function Run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i=0;i<use_ball;++i){
	
		balls[i].x+=dx*balls[i].xdir;	
		if(balls[i].x<ballRadius){
			balls[i].x=ballRadius;
			balls[i].xdir=-balls[i].xdir;
		}
		if(balls[i].x>canvas.width-ballRadius){
			balls[i].x=canvas.width-ballRadius;
			balls[i].xdir=-balls[i].xdir;
		}
		
		balls[i].y+=dy*balls[i].ydir;
		if(balls[i].y<ballRadius){
			balls[i].y=ballRadius;
			balls[i].ydir=-balls[i].ydir;
		}
		if(balls[i].y>canvas.height-ballRadius){
			balls[i].y=canvas.height-ballRadius;
			balls[i].ydir=-balls[i].ydir;
		}
		
		for(var j=0;j<i;++j){
			if(balls[j].x-ballRadius <= balls[i].x && balls[i].x <= balls[j].x+ballRadius){
				if(balls[j].y-ballRadius <= balls[i].y && balls[i].y <= balls[j].y+ballRadius){
					balls[i].x+=ballRadius;
					balls[i].y+=ballRadius;
					balls[i].xdir=-balls[i].xdir;
					balls[i].ydir=-balls[i].ydir;
					
					balls[j].x-=ballRadius;
					balls[j].y-=ballRadius;
					balls[j].xdir=-balls[j].xdir;
					balls[j].ydir=-balls[j].ydir;
				}
			}
		}

		drawBall(balls[i].x, balls[i].y);		
    }
}

$(document).ready(function(){
	Init();
	Running = setInterval(Run, 20);
});