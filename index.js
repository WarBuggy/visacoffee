const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const portNumber = 8566;

start();

async function start() {
    app.use(express.json());
    app.use(express.urlencoded({ limit: '10mb', extended: false, }));
    app.use(cors());
    http.createServer(app).listen(portNumber, function () {
        console.log(`HTTP Server started on port ${portNumber}.`);
        require('./api.js')(app);
    });
};

