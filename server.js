const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const {
    Server
} = require('socket.io');
const fs = require('fs')

const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    fs.readFile('index.html', function (error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        }
        res.end()
    })
});

const io = new Server(server)

app.use(express.static(path.join(__dirname + '/public')));

io.on('connection', socket => {
    console.log('New User Connection...');
    socket.emit('message', 'Välkommen till oss!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})