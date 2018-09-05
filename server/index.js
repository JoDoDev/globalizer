const path = require('path');
const express = require('express');
const compression = require('compression');
const http = require('http');
const socketIo = require('socket.io');
const uuid = require('uuid/v4');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = process.env.GLOBALIZER_ENV === 'PRODUCTION';
const USERS = [];

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(compression());

app.use((req, res, next) => {
  if (!IS_PRODUCTION || req.headers['x-forwarded-proto'] === 'https')
    next();
  else
    res.redirect('https://' + req.headers.host + req.url);
});

app.use(express.static(PUBLIC_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
});

io.on('connection', function (socket) {
  socket.on('AUTH_USERNAME', (username) => {
    console.log('auth username');
    const userId = uuid();
    USERS.push({
      username,
      userId
    });
    socket.emit('AUTH_USERNAME', {
      success: true,
      userId
    })
  })
});

server.listen(PORT);
