import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io('http://localhost:6969');
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -1;
var ballRadius = 10;
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if(x +dx <= ballRadius || x+dx >= canvas.width-ballRadius){
        dx = -dx
    }
    if(y+dy <= ballRadius || y+dy >= canvas.height-ballRadius){
        dy = -dy
    }
    x += dx;
    y += dy;
}

setInterval(draw, 10);
