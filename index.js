const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/styles',express.static(__dirname + '/style'))

app.get('/',(req,res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    
    socket.on('message', (msg) => io.emit('message',msg))
    socket.on('join', (username) => {
        if(username != null){
            socket.username = username
        }
        socket.broadcast.emit('message', 'some one joined')
    })
});
http.listen(3000, () => console.log('Listening on port 3000'))