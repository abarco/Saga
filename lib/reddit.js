"use strict";

var http = require('q-io/http');
var logger = require('winston');
var config = require('../setup').getConfig();

var lib = {
    readFrontPage: function () {
        logger.info('Making http request to top.json');
        return http.request({url: config.baseUrl + "top.json"})
            .then(function (res) {

                if(res.status === 200) {
                    return res.body.read()
                        .then(function (bodyStream) {
                            var body = bodyStream.toString('UTF-8');
                            logger.info('Request Successful!');

                            return JSON.parse(body);
                        });
                }
                else {
                    logger.info('The request was unsuccessful! :(');
                }

            });
    }
};

module.exports = lib;