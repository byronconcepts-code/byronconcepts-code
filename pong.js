// gets the information from the html document for the canvas
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

if(window.innerWidth > window.innerHeight) {
    canvas.height = (window.innerHeight/10)*9;
    canvas.width = (canvas.height/3)*4;
}
if(window.innerWidth < window.innerHeight) {
    canvas.width = (window.innerWidth/10)*9;
    canvas.height = (canvas.width/4)*3;
}

window.addEventListener('resize', function(){
    if(window.innerWidth > window.innerHeight) {
        canvas.height = (window.innerHeight/10)*9;
        canvas.width = (canvas.height/3)*4;
    }
    if(window.innerWidth < window.innerHeight) {
        canvas.width = (window.innerWidth/10)*7;
        canvas.height = (canvas.width/4)*3;
    }
    variables();
})

// waits till page has finished loading before running script
window.onload = function() {   
    // main loop
    var framesPerSecond = 60;
    setInterval(function() {
        background();
        movement();
        drawObjects();
    }, 1000/framesPerSecond);
};

window.onkeydown = function() {
    if(this.event.keyCode == 38) {
        this.paddleSpeed = -10*change;
        console.log('arrow up pressed');
    }
    if(this.event.keyCode == 40) {
        this.paddleSpeed = 10*change;
        console.log('arrow down pressed');
    }
};
window.onkeyup = function() {
    this.paddleSpeed = 0;
}

// creates the variables
// paddle constants and variables
var change = canvas.width/900;
var paddleSpeed = 0;
var paddleWidth = 12*change;
var paddleHeight = 120*change;
var paddle1X = 20*change;
var paddle1Y = canvas.height/2-paddleHeight/2;

var paddle2X = canvas.width-20*change-paddleWidth;
var paddle2Y = canvas.height/2-paddleHeight/2;

// ball constants and variables
var ballWidth = 10*change;
var ballHeight = 10*change;
var ballDiameter = 20*change;
var ballRadius = ballDiameter/2*change;
var ballX = canvas.width/2-ballWidth/2*change;
var ballY = canvas.height/2-ballHeight/2*change;
var ballSpeedX = 5*change;
var ballSpeedY = 3*change;

var centerLineWidth = 5*change;

var p1Score = 0;
var p2Score = 0;

function variables(){
    change = canvas.width/900;
    paddleSpeed = 0;
    paddleWidth = 12*change;
    paddleHeight = 120*change;
    paddle1X = 20*change;
    paddle1Y = canvas.height/2-paddleHeight/2;

    paddle2X = canvas.width-20*change-paddleWidth;
    paddle2Y = canvas.height/2-paddleHeight/2;

    // ball constants and variables
    ballWidth = 10*change;
    ballHeight = 10*change;
    ballDiameter = 20*change;
    ballRadius = ballDiameter/2*change;
    ballX = canvas.width/2-ballWidth/2*change;
    ballY = canvas.height/2-ballHeight/2*change;
    ballSpeedX = 5*change;
    ballSpeedY = 3*change;

    centerLineWidth = 5*change;
}

// draw the background
function background() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// create rectangles
function drawRect(drawX, drawY, rectWidth, rectHeight, rectColour) {
    this.ctx.fillStyle = rectColour;
    this.ctx.fillRect(drawX, drawY, rectWidth, rectHeight);
};

// create circle
function drawCircle(drawX, drawY, radius, circleColour) {
    this.ctx.fillStyle = circleColour;
    this.ctx.beginPath();
    this.ctx.arc(drawX, drawY, radius, 0, Math.PI*2, true);
    this.ctx.fill();
};

// create centre line
function drawCenterLine() {
    this.ctx.beginPath();
    this.ctx.setLineDash([30*change]);
    this.ctx.moveTo(canvas.width/2-centerLineWidth/2, 20*change);
    this.ctx.lineTo(canvas.width/2-centerLineWidth/2, canvas.height);
    this.ctx.lineWidth = centerLineWidth;
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
};

// draw text
function drawText(drawX, drawY, text, fillColour) {
    this.ctx.fillStyle = fillColour;
    this.ctx.font = String(50*change + 'px Arial');
    var textWidth = this.ctx.measureText(text).width;
    this.ctx.fillText(text, drawX-textWidth/2, drawY)
}

function drawObjects() {
    // draw paddle 1
    this.drawRect(paddle1X, paddle1Y, paddleWidth, paddleHeight, 'white');

    // draw paddle 2
    this.drawRect(paddle2X, paddle2Y, paddleWidth, paddleHeight, 'white');

    // draw centre line
    drawCenterLine();

    // draw ball
    this.drawCircle(ballX, ballY, ballDiameter/2, 'white');

    // draw left score
    this.drawText(canvas.width/4, 75*change, String(p1Score), 'white');

    // draw right score
    this.drawText(canvas.width/4*3, 75*change, String(p2Score), 'white');
};

// movement
function movement() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    paddle1Y += paddleSpeed;

    if(ballX-ballRadius < 0) {
        ballX = canvas.width/2-ballWidth/2*change;
        ballSpeedX = 5*change;
        ballSpeedY = 3*change;
        p2Score++;
    };
    if(ballX+ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
        p1Score++;
    };
    if(ballY-ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    };
    if(ballY+ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    };

    if(ballX <= paddle1X+paddleWidth && ballY > paddle1Y && ballY+ballHeight <= paddle1Y+paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if(paddle1Y < 0) {
        paddle1Y = 0;
    }
    if(paddle1Y+paddleHeight > canvas.height) {
        paddle1Y = canvas.height-paddleHeight;
    }
};

