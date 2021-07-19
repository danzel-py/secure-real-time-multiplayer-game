import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
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

var rad = 10
var spawnX = Math.round(Math.random()*(canvas.clientWidth));
var spawnY = Math.round(Math.random()*(canvas.clientHeight));
let player0 = new Player(spawnX,spawnY,0,new Date().getUTCMilliseconds())

function drawPlayer(x,y,ballRadius){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#00FFFFF";
    ctx.fill();
    ctx.closePath()
}

socket.emit("clientJoin",player0)
function draw(data = {}){
    ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight)
    drawPlayer(player0.x,player0.y,rad)
    if(pressRight && player0.x < canvas.clientWidth-rad){
        console.log("right")
        player0.movePlayer("right",3)
        socket.emit("clientJoin",player0)
    }
    for (const player in data){
        drawPlayer(data[player].x,data[player].y,rad)
    }
}


socket.on("player",(data)=>{
    console.log("online: ", data.total) // logs in client side
})

socket.on("allPlayer",(data)=>{
    console.log(data)
    draw(data)
})

