// server.js

var path = require('path');

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var frontEnd = express(); // define our frontend to use expres
var bodyParser = require('body-parser');
var models = require('./models');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port
var frontEndPort = process.env.PORT || 8081; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
require('./routes')(router, models);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// SYNC DATABASE
// =============================================================================
models.sequelize.sync().then(function () {
    // START THE SERVER
    // =============================================================================
    var server = app.listen(port, function () {
        console.log('Magic happens on port ' + port);
    });
});

frontEnd.use('/public', express.static('./front/public'));

frontEnd.all('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/front/index.html'));
});

frontEnd.listen(frontEndPort, function () {
    console.log('Magic frontend happens on port ' + frontEndPort);
});