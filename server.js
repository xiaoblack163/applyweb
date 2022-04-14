const path = require('path');
const express = require('express');
var compression = require('compression')
const bodyParser = require('body-parser');
const router = require('express').Router();
var request = require('request');

const PORT = process.env.NODE_PORT
const port = PORT || 9005
const app = express();

app.use(compression())
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/images', express.static(__dirname + '/build/images'));
app.use('/favicon', express.static(__dirname + '/favicon'))
// 网站升级提示目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(`/server`,router)

// router.get('/transferImage', function (req, res) {
//     var path = req.query && req.query.path;
//     return request.get(path).pipe(res);
// })

// app.get('*', function response(req, res) {
//         res.sendFile(path.join(__dirname, 'build/index.html'));
// })

// app.use((req, res, next) => {
//     //设置请求头
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Max-Age': 1728000,
//         'Access-Control-Allow-Origin': req.headers.origin || '*',
//         'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
//         'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
//         'Content-Type': 'application/json; charset=utf-8'
//     })
//     req.method === 'OPTIONS' ? res.status(204).end() : next()
// })



app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
