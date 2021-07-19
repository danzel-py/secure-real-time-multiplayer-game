import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io('http://localhost:6969');
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

var pressLeft = false;
var pressDown = false;
var pressUp = false;
var pressRight = false;

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        pressRight = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        pressLeft = true;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        pressUp = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        pressDown = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        pressRight = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        pressLeft = false;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        pressUp = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        pressDown = false;
    }
}

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 1;
var dy = -1;
var ballRadius = 10;
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (pressDown) {
        y -= dy
    }
    if(pressUp){
        y+= dy
    }
    if(pressRight){
        x+= dx
    }
    if(pressLeft){
        x-= dx
    }
    if (x <= ballRadius) {
        x = ballRadius
    }
    else if (x >= canvas.width - ballRadius) {
        x = canvas.width - ballRadius
    }
    if (y <= ballRadius) {
        y = ballRadius
    }
    else if( y >= canvas.height - ballRadius){
        y = canvas.height - ballRadius
    }
}

setInterval(draw, 10);
