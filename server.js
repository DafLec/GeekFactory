const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, './app');
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 63342;

app.use(express.static(publicPath));
app.use(express.static('app'));

server.listen(port, () => console.log(`Server is up on port ${port}`));