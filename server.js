require('dotenv').config();
const express = require('express');
const expect = require('chai');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});



let currentUser = 0;
const socketIdMap = new Map();
let allUser = {}
io.on('connection',(socket)=>{
  currentUser++;
  socket.broadcast.emit("allPlayer",allUser)
  console.log("This guy joined: "+ socket.id)
  socket.broadcast.emit("player",{total: currentUser, connect: true})
  socket.on('disconnect',()=>{
    console.log("This guy left: " + socketIdMap.get(socket.id))
    delete allUser[socketIdMap.get(socket.id)]
    socketIdMap.delete(socket.id)
    socket.broadcast.emit("player",{total: currentUser, connect: false})
    socket.broadcast.emit("allPlayer",allUser)
    currentUser--;
  })
  socket.on('clientJoin',(data)=>{
    socketIdMap.set(socket.id, data.id)
    console.log(socketIdMap.get(socket.id))
    allUser[data.id] = {}
    allUser[data.id].x = data.x
    allUser[data.id].y = data.y
    allUser[data.id].score = data.score
    socket.broadcast.emit('allPlayer',allUser)
  })
  
})


const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = http.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

module.exports = app; // For testing
