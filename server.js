const path = require('path');
const express = require('express');
var compression = require('compression')
const bodyParser = require('body-parser');

const PORT = process.env.NODE_PORT
const port = PORT || 9005
const app = express();

app.use(compression())
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/favicon', express.static(__dirname + '/favicon'))
// 网站升级提示目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
