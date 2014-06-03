var build = require('./build');
var express = require('express');

/*
 * App.
 */

var app = express();

/*
 * Development
 */

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(builder);
});

/*
 * Static.
 */

app.use(express.static(__dirname + '/build'));

/**
 * listen.
 */

app.listen('3003', function() {
  console.log('Server running at http://localhost:3003');
});

/**
 * Builder middleware
 */
function builder(req, res ,next) {
  if ('/' != req.path) return next();
  build(function(err) {
    if (err) return next(err);
    console.log('Built');
    next();
  });
}