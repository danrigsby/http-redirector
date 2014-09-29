/*
    Redirects all traffic to a given host (keeps http method, path, query strings, etc)
    To use:
        node app.js -r 'https://www.MYBASEADDRESS.com'
 */
'use strict';

var express = require('express');
var http = require('http');
var app = express();
var program = (require('commander'))
    .description('Redirects all traffic to a given host (keeps http method, path, query strings, etc)')
    .option('-r, --redirectTo <path>', 'The base url to redirect to')
    .option('-p, --port <port>', 'The port to run on [3000]', Number, 3011)
    .option('-c, --redirectCode <code>', 'The http redirect method to use [301]', Number, 301)
    .option('-P, --noPing', 'Do not ignore calls to /ping.html')
    .parse(process.argv);

// Allow a simple ping request (for load balancers etc)
if (!program.noPing) {
    app.get(/^\/ping(\.html)?$/, function (req, res, next) {
        res.status(200).send('pong');
    });
}

// Redirect everything else
app.all(/^\/.*/, function (req, res, next) {
    var q = require('url').parse(req.url).query;
    res.redirect(program.redirectCode, program.redirectTo + req.path + (q ? ('?' + q) : ''));
});

// Start the web server
http.createServer(app).listen(program.port, function () {
    console.log('Starting server on port: ' + program.port);
    console.log('Redirecting all traffic to: ' + program.redirectTo);
});
