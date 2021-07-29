"use strict";
var express = require('express');
var routes = require('../src/routes/main');
var app = express();
var PORT = 3000;
app.use('/api', routes);
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});
