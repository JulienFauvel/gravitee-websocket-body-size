const io = require('socket.io-client');
const crypto = require('crypto');

const [,, size = '1000', throughGravitee = 'true'] = process.argv;

const GRAVITEE = 'localhost:8082';
const DIRECT = 'localhost:8086';
const url = throughGravitee === 'true' ? GRAVITEE : DIRECT;

console.log('Trying to connect to', url);
const socket = io(`http://${url}`, {
  path: '/ws',
  reconnectionDelayMax: 10000,
});

socket.on('connect', () => {
  const binarySize = Math.ceil(Number(size) * 3 / 4);
  console.log(`Connected, sending message of ~${Math.ceil(binarySize / 1024)}kb size`)
  const message = crypto.randomBytes(binarySize).toString('base64');
  socket.send(message);
})

socket.on('disconnect', () => {
  console.log('Disconnect, stopping client')
  process.exit(1);
})

socket.on('message', (_data) => {
  console.log('Message received')
  process.exit(0);
})
