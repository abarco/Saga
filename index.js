"use strict";

var fs = require('q-io/fs');
var http = require('q-io/http');
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('winston');
var setup = require('./setup');



setup.readConfig()
    .then(function (config) {

        var routes = require('./routes/index');

        var Saga = express();

        // view engine setup
        Saga.set('views', path.join(__dirname, 'views'));
        Saga.set('view engine', 'jade');

        Saga.use(morgan('dev'));
        Saga.use(favicon(__dirname + '/public/yinyang.png'));
        Saga.use(bodyParser.json());
        Saga.use(bodyParser.urlencoded({ extended: true }));
        Saga.use(express.static(path.join(__dirname, 'public')));

        Saga.use('/', routes);

        Saga.set('port', process.env.PORT || 8000);

        Saga.listen(Saga.get('port'), function () {
            logger.info('listening at http://127.0.0.1: ' + Saga.get('port'));
        });
    });
