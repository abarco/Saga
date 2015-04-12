var _ = require('underscore');
var express = require('express');
var morgan = require('morgan');
var logger = require('winston');
var stylus = require('stylus');
var nib = require('nib');
var uaParser = require('ua-parser');

function Saga (app) {
    this.app = app;
}

var ENV_CONFIGS = {
    production: 'config.json',
    development: 'config-development.json',
    test: 'config-test.json'
};

_.extend(Saga.prototype, {
    configure: function (options) {
        this.appDir = options.appDir || proces.cwd();
        this.dataDir = this.appDir + '/data';
        this.staticDir = this.appDir + '/public';
        this.env = process.env.NODE_ENV || 'development';

        var configFile = ENV_CONFIGS[this.env] || 'app-development.json';
        this.config = require('../config/' + configFile);
        this.baseUrl = this.config.baseUrl || 'http://localhost';
        this.port = this.config.port || 800;
    },

    setup: function () {
        function compile(str, path) {
            return stylus(str)
                .set('filename', path)
                .use(nib());
        }

        var app = this.app;

        app.set('views', this.appDir + '/views');
        app.set('view engine', 'jade');
        app.use(morgan('combined'));
        app.use(stylus.middleware({
            src: this.appDir + '/public',
            compress: true,
            compile: compile
        }));

        app.use(express.static(this.staticDir));
        var bodyParser = require('body-parser');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));

        app.use(function setup(req, res, next) {
            req.channel = uaParser.parse(req.headers['user-agent']);
            req.channel.isMobileOS = [ 'Android', 'iOS', 'Windows Phone' ].indexOf(req.channel.os.family) >= 0;
            logger.info('Channel: ' + req.channel);
            req.saga = this;
            req.baseUrl = this.baseUrl + (this.port ? ':' + this.port : '');
            next();
        }.bind(this));

        app.get('/', require('../routes'));

    },

    listen: function () {
        this.app.listen(this.port, function () {
            logger.info('--- Saga Listening at port ' + this.port + ' ---');
        }.bind(this));
    }
});

module.exports = Saga;