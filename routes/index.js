"use strict";

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var logger = require('winston');
var reddit = require('../lib/reddit');

/* GET home page. */
router.get('/', function(req, res) {
    logger.info('Index GET has been summoned');
    reddit.readFrontPage()
        .then(function (response) {
            var content = response.data.after;
            res.render('index', { title: 'Express', data: content });
        });
});

module.exports = router;