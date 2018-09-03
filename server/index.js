const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;

app.use(express.static(PUBLIC_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
});

server.listen(PORT);
