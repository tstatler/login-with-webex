const server = require('http');
const express = require('express');

var app = express();

app.use(express.static('docs'))

app.get('/ping', (req, res) => {
    res.writeHead(200);
    res.end("Hello world\n");
})

server.createServer(app).listen(3000);
