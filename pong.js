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
    if(playSound == true) {
        console.log('Play music')
        music.play();
    }
    if(playSound == false) {
        console.log('Play music')
        music.pause();
    }
    var framesPerSecond = 60;
    setInterval(function() {
        if(showStart == true) {
            this.ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
            window.addEventListener('keydown', function() {
                this.showStart = false;
            })
        }
        else {
            background();
            movement();
            drawObjects();
            win();}
            
    }, 1000/framesPerSecond);
};

window.onkeydown = function() {
    if(this.event.keyCode == 38) {
        this.paddle1Speed = -10*change;
    }
    if(this.event.keyCode == 40) {
        this.paddle1Speed = 10*change;
    }
    if(this.event.keyCode == 77) {
        if(this.playSound == false) {
            this.playSound = true;
            this.image.src = 'volume on.png'
        }
        else if(this.playSound == true) {
            this.playSound = false;
            this.image.src = 'volume off.png';
        }
    }

    if(this.event.keyCode == 82) {
        ballX = canvas.width/2-ballWidth/2*change;
        ballY = canvas.height/2-ballHeight/2*change;
    }
};
window.onkeyup = function() {
    if(this.event.keyCode == 38 || this.event.keyCode == 40){
        this.paddle1Speed = 0;
    }
}

// creates the variables
// paddle constants and variables
var change = canvas.width/900;
var paddle1Speed = 0;
var paddle2Speed = 0;
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
var ballSpeedX = 7*change;
var ballSpeedY = 5*change;

var centerLineWidth = 5*change;

var p1Score = 0;
var p2Score = 0;

var audio = new Audio('beep.mp3');
var playSound = true;

var music = new Audio('Game Music.mp3');
music.loop = true;
music.volume = 0.5;

var image = new Image();
image.src = 'volume on.png';
var imageWidth = 20*change;
var imageHeight = 20*change;
var imageX = 20*change;
var imageY = 20*change;

var startImage = new Image();
startImage.src = 'start screen.png';
var showStart = true;

function variables(){
    change = canvas.width/900;
    paddle1Speed = 0;
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
    ballSpeedX = 7*change;
    ballSpeedY = 5*change;

    centerLineWidth = 5*change;

    imageWidth = 20*change;
    imageHeight = 20*change;
    imageX = 20*change;
    imageY = 20*change;
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

    // draw mute button
    this.ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
};

function sound() {
    if(playSound == true) {
        audio.play();
    }
}

// movement
function movement() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    paddle1Y += paddle1Speed;
    paddle2Y += paddle2Speed;

    // ball edge detection
    if(ballX-ballRadius < 0) {
        ballX = canvas.width/2-ballWidth/2*change;
        ballSpeedX = -7*change;
        ballSpeedY = 5*change;
        sound();
        p2Score++;
        
    };
    if(ballX+ballRadius > canvas.width) {
        ballX = canvas.width/2-ballWidth/2*change;
        ballSpeedX = ballSpeedX;
        ballSpeedY = 5*change;
        sound();
        p1Score++;
    };
    if(ballY-ballRadius < 0) {
        sound();
        ballSpeedY = -ballSpeedY;
    };
    if(ballY+ballRadius > canvas.height) {
        sound();
        ballSpeedY = -ballSpeedY;
    };

    // ball paddle 1 detection
    if(ballX <= paddle1X+paddleWidth) {
        if(ballY <= paddle1Y+paddleHeight/3 && ballY+ballHeight >= paddle1Y) {
            sound();
            ballSpeedX = -ballSpeedX;
            if(ballSpeedY == 5*change) {
                ballSpeedY = -5*change;
            }
            if(ballSpeedY == 0) {
                ballSpeedY = -10*change;   
            }
        }
        if(ballY <= paddle1Y+paddleHeight && ballY > paddle1Y+(paddleHeight/3)*2) {
            sound();
            ballSpeedX = -ballSpeedX;
            if(ballSpeedY == -5*change) {
                ballSpeedY = 5*change;
            }
            if(ballSpeedY == 0) {
                ballSpeedY = 10*change;   
            }
        }
        if(ballY <= paddle1Y+(paddleHeight/3)*2 && ballY > paddle1Y+paddleHeight/3) {
            sound();
            ballSpeedX = -ballSpeedX;
            ballSpeedY = 0;
        }
    }

    // ball paddle 2 detection
    if(ballX > paddle2X) {
        if(ballY <= paddle2Y+paddleHeight/3 && ballY+ballHeight > paddle2Y) {
            sound();
            ballSpeedX = -ballSpeedX;
            if(ballSpeedY == 5*change) {
                ballSpeedY = -5*change;
            }
            if(ballSpeedY == 0) {
                ballSpeedY = -10*change;   
            }
        }
        if(ballY <= paddle2Y+paddleHeight && ballY > paddle2Y+(paddleHeight/3)*2) {
            sound();
            ballSpeedX = -ballSpeedX;
            if(ballSpeedY == -5*change) {
                ballSpeedY = 5*change;
            }
            if(ballSpeedY == 0) {
                ballSpeedY = 10*change;   
            }
        }
        if(ballY <= paddle2Y+(paddleHeight/3)*2 && ballY > paddle2Y+paddleHeight/3) {
            sound();
            ballSpeedX = -ballSpeedX;
            ballSpeedY = 0;
        }
    }

    // paddle edge collision detection
    if(paddle1Y < 0) {
        paddle1Y = 0;
    }
    if(paddle1Y+paddleHeight > canvas.height) {
        paddle1Y = canvas.height-paddleHeight;
    }

    if(paddle2Y < 0) {
        paddle2Y = 0;
    }
    if(paddle2Y+paddleHeight > canvas.height) {
        paddle2Y = canvas.height-paddleHeight;
    }

    // paddle 2 ai
    if(ballY < paddle2Y+paddleHeight*0.2) {
        // 4.5/4.6
        paddle2Speed = -7*change;
    }
    if(ballY > paddle2Y+paddleHeight*0.8) {
        // 4.72
        paddle2Speed = 7*change;
    }
    if(ballY > paddle2Y && ballY < paddle2Y+paddleHeight && ballSpeedY == 0) {
        paddle2Speed = 0;
    }
};

function win() {
    if(p1Score == 15) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(canvas.width/2, canvas.height/2, 'CONGRATULATIONS, YOU WON!!!', 'white');
        ballSpeedY = 0;
        ballSpeedX = 0;
    }
    if(p2Score == 15) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(canvas.width/2, canvas.height/2, 'YOU LOST!!!', 'white');
        ballSpeedY = 0;
        ballSpeedX = 0;
    }
}

function startScreen() {
    this.ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    window.onkeydown = function() {
    this.showStart = false;
    }
}
