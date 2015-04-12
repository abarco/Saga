"use strict";

var logger = require('winston');
var reddit = require('../lib/reddit');

var routeRegister = function (app) {
    logger.info('Registering Routes...');

    app.get('/api/getFrontPage', function (req, res) {
        logger.info('Getting Front page information');
        reddit.readFrontPage()
            .then(function (response) {
                var r = response.data;
                res.json(r);
            });
    });

    app.get('/', function (req, res) {
        logger.info('Rendering Index...');

        res.sendFile('./public/index.html');
    });

    app.get('*', function (req, res) {
        logger.info('Unknown Route....');
        res.status(404);
        res.json({error: 'no such route'});
    });

    logger.info('Registering Routes done!');
};

module.exports = routeRegister;