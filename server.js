'use strict';

const fs = require('fs');
const path = require('path');
const http2 = require('http2');
const url = require('url');

const PORT = process.env.PORT || 3000;
const cert = fs.readFileSync(path.join(__dirname, '/certificate.crt'));
const key = fs.readFileSync(path.join(__dirname, '/privateKey.key'));
const {HTTP2_HEADER_PATH} = http2.constants;
const pushFile = (filePath, res) => {
    fs.readFile(`./${filePath}`, {encoding: 'utf-8'}, (err, data) => {
        if (err) console.error(err);
        else {
            res.stream.pushStream({[HTTP2_HEADER_PATH]: `/${filePath}`}, (pushStream) => {
                pushStream.end(data);
            });
        }
    });
};
const respondWithFile = (filePath, res) => {
    wait(1000);
    fs.readFile(`./${filePath}`, {encoding: 'utf-8'}, (err, data) => {
        if (err) console.error(err);
        else {
            res.end(data);
        }
    });
};

const onRequest = (req, res) => {
    const reqPath = url.parse(req.url).pathname;
    if (reqPath === '/') {
        pushFile('styles.css', res);
        respondWithFile('index.html', res);
    } else if (reqPath === '/nopush') {
        respondWithFile('index.html', res);
    }
    else {
        respondWithFile(reqPath, res);
    }
};

http2
    .createSecureServer({cert, key}, onRequest)
    .listen(PORT);

function wait(ms) {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}