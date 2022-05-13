const express = require("express");
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = 3000;

const user = {}

app.use(express.static(path.join(__dirname + '/public')));

io.on('connection', (socket) => {
    console.log(`User with id ${socket.id} joined to the chat!`);

    socket.on('new-connection', userName => {
        user[socket.id] = userName
        socket.broadcast.emit('connected', userName)
    })

    socket.on('send-message', message => {
        socket.broadcast.emit('message', {
            message: message,
            userName: user[socket.id]
        })
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', user[socket.id])
        delete user[socket.id]
        console.log(`User with id ${socket.id} left the chat!`);
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});