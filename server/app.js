const express = require('express');
const parser = require('body-parser');
const app = express();
const EventEmitter = require('events');

const Stream = new EventEmitter();

app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: true,
  }),
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/sse-endpoint', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  Stream.on('push', (event, data) => {
    res.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
  });
});

setInterval(() => {
  Stream.emit('push', 'message', { msg: 'it works!' })
}, 10000);

app.listen(3000);

console.info('Express mock server running');
