/* 
 Name: James Nicoliello
 File: SakeGame.js
*/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;


var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const CVS_HEIGHT = 300;
const CVS_WIDTH = 300;    

const KeyW = 87;
const KeyA = 65;
const KeyS = 83;
const KeyD = 68;


var x_Dots = new Array(ALL_DOTS);
var y_Dots = new Array(ALL_DOTS);   


function init() {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    SpawnApple();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    
    head = new Image();
    head.src = 'Head.JPG';    
   
    ball = new Image();
    ball.src = 'body.jpg'; 
    
	
    apple = new Image();
    apple.src = "apple.png"; 
}

function createSnake() {

    dots = 3;

    for (var z = 0; z < dots; z++) {
        x_Dots[z] = 50 - z * 10;
        y_Dots[z] = 50;
    }
}

function checkApple() {

    if ((x_Dots[0] == apple_x) && (y_Dots[0] == apple_y)) {

        dots++;
        locateApple();
    }
}    

function doDrawing() {
    
    ctx.clearRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
    
    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {
            
            if (z == 0) {
                ctx.drawImage(head, x_Dots[z], y_Dots[z]);
            } else {
                ctx.drawImage(ball, x_Dots[z], y_Dots[z]);
            }
        }    
    } else {

        gameOver();
    }        
}

function gameOver() {
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', CVS_WIDTH/2, CVS_HEIGHT/2);
	ctx.fillText('Thank you for playing', CVS_WIDTH/2, (CVS_HEIGHT/2)+100);
	
}

function resetCanvas() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	init();
	
}

function checkApple() {

    if ((x_Dots[0] == apple_x) && (y_Dots[0] == apple_y)) {

        dots++;
        SpawnApple();
    }
}

function move() {

    for (var z = dots; z > 0; z--) {
        x_Dots[z] = x_Dots[(z - 1)];
        y_Dots[z] = y_Dots[(z - 1)];
    }

    if (leftDirection) {
        x_Dots[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x_Dots[0] += DOT_SIZE;
    }

    if (upDirection) {
        y_Dots[0] -= DOT_SIZE;
    }

    if (downDirection) {
        y_Dots[0] += DOT_SIZE;
    }
}    

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x_Dots[0] == x_Dots[z]) && (y_Dots[0] == y_Dots[z])) {
            inGame = false;
        }
    }

    if (y_Dots[0] >= CVS_HEIGHT) {
        inGame = false;
    }

    if (y_Dots[0] < 0) {
       inGame = false;
    }

    if (x_Dots[0] >= CVS_WIDTH) {
      inGame = false;
    }

    if (x_Dots[0] < 0) {
      inGame = false;
    }
}

function SpawnApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}    

function gameCycle() {
    
    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}
onkeydown = function(e) {
    
    var key = e.keyCode;
    
	switch(key){
		
	}
	
    if ((key == KeyA) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    else if ((key == KeyD) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    else if ((key == KeyW) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    else if ((key == KeyS) && (!upDirection)) {
       
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }       
};    