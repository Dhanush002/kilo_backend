const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // In production, specify your actual domain
        methods: ["GET", "POST"]
    }
});

// Serve static files (optional, for static assets like CSS or images)
app.use(express.static('public'));

// When a user connects to the server
io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for messages
    socket.on('chat message', (msgData) => {
        // Broadcast the message to all other connected users
        io.emit('chat message', msgData);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});