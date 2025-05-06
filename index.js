const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
/** 
Gets the current data from the default directory and sends a basic HTML page to the client
*/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
//creates an object to store nicknames
const nicknames= {};
/**
 * logs when a user socket connects to the server
 */
io.on('connection', (socket) => {
    console.log('a user connected');
    //logs when a user disconnects
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
    /**
     * Handles nicknames
     */
    socket.on('newnick', (nickname) => {
        nicknames[socket.id] = nickname;
        socket.broadcast.emit('chat message', `[Server] ${nickname} has joined the chat!`);
    })
    //logs when there is a chat message
    socket.on('chat message', (message) => {
        const sender = nicknames[socket.id] || 'Anonymous';
        io.emit('chat message', `${sender}: ${message}`);
    })
})
/**
 * Starts the server on port 80 and listens for requests
 */
server.listen(80, () => {
    console.log("listening on port 80")
})

