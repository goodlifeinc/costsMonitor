var fs = require('fs'),
  path = require('path');


module.exports = function(router) {

    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    fs.readdir(__dirname, function(err, results) {
      results.forEach(function(route) {
        if(route.indexOf('.js') !== -1) {
          return;
        }

        require(__dirname + '/' + route)(router);
      });
    });
};
