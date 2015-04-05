"use strict";

var logger = require('winston');
var fs = require('q-io/fs');

var config = {};


module.exports = {
    readConfig: function () {
        return fs.read(fs.join(__dirname, 'config.json'))
            .then(function (content) {
                logger.info('Reading configurations');
                config = JSON.parse(content);

                return config;
            });
    },

    getConfig: function () {
        return config;
    }
}