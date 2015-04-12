"use strict";

var express = require('express');
var Saga = require('./lib/Saga');

var app = express();

var saga = new Saga(app);
saga.configure({appDir: __dirname});
saga.setup();
saga.listen();