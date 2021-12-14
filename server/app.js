const { HOST = '0.0.0.0', PORT = 8080 } = process.env;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  path: '/ws',
  maxHttpBufferSize: Number.POSITIVE_INFINITY,
});

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('message', (message) => {
    socket.send(message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  });
});

server.listen(PORT, HOST, () => {
  console.log(`listening on ${HOST}:${PORT}`);
});

app.get('/', (_req, res) => {
  return res.json({ message: 'ok' });
})
