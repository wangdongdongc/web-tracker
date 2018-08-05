const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        res.end();
        return;
    }
    res.write(fs.readFileSync(path.join(__dirname, req.url)));
    res.end();
}).listen(8080);

console.log('serve: localhost:8080/index.html');