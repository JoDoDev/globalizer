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
let MESSAGES = [];
let userCount = 0;

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

app.get('/ping', (req, res) => {
  res.send('pong')
});

if (!IS_PRODUCTION) {
  app.post('/clear', (req, res) => {
    console.log('clear');
    MESSAGES = [];
    res.send('ok')
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
});

io.on('connection', function (socket) {
  let user = null;
  io.emit('USER_COUNT', ++userCount);

  socket.on('AUTH_USERNAME', (username) => {
    console.log('AUTH_USERNAME');
    user = {
      username,
      userId: uuid(),
      userKey: uuid()
    };
    USERS.push(user);
    socket.emit('AUTH_USERNAME', {
      success: true,
      userId: user.userId,
      userKey: user.userKey
    });
  });
  socket.on('AUTH_USER_ID', (userId) => {
    console.log('AUTH_USER_ID');
    const foundUser = USERS.find((user) => user.userId === userId);

    if (foundUser === undefined) {
      socket.emit('AUTH_USER_ID', {
        success: false
      })
    } else {
      user = foundUser;
      socket.emit('AUTH_USER_ID', {
        success: true,
        username: user.username,
        userKey: user.userKey
      });
    }
  });
  socket.on('INITIAL_MESSAGES', () => {
    io.emit('INITIAL_MESSAGES', MESSAGES);
  });
  socket.on('SEND_MESSAGE', (text) => {
    console.log('SEND_MESSAGE');

    if (user === null) {
      socket.emit('SEND_MESSAGE', {
        success: false
      })
    } else {
      const message = {
        text,
        userKey: user.userKey,
        username: user.username,
        time: new Date().toISOString()
      };
      io.emit('MESSAGES', [message]);
      MESSAGES.push(message);
    }
  });
  socket.on('USER_COUNT', () => {
    console.log('USER_COUNT');

    socket.emit('USER_COUNT', userCount);
  });
  socket.on('disconnect', function () {
    console.log('disconnect');

    io.emit('USER_COUNT', --userCount);
  });
});


server.listen(PORT, () => {
  console.log(`starting server on PORT:${PORT} in PRODUCTION:${IS_PRODUCTION}`)
});
