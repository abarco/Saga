"use strict";

var http = require('q-io/http');
var logger = require('winston');
var redditMapper = require('./mappers/listingMapper');


var lib = {
    readFrontPage: function () {
        logger.info('Calling reddit top');
        return http.request({url: "http://www.reddit.com/" + "top.json"})
            .then(function (res) {

                if(res.status === 200) {
                    return res.body.read()
                        .then(function (bodyStream) {
                            var body = bodyStream.toString('UTF-8');
                            logger.info('Response reddit top: ' + JSON.stringify(JSON.parse(body)));

                            return redditMapper.listingMapper(JSON.parse(body));
                        });
                }
                else {
                    logger.info('The request was unsuccessful! :(');
                }

            });
    }
};

module.exports = lib;