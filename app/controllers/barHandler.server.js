'use strict';

var Bars = require('../models/bars.js');
var Users = require('../models/users.js');
var Yelp = require('yelp');

var appUrl = process.env.APP_URL

function BarHandler() {

  this.yelpSearch = function(req, res) {
    var searchLocation = req.query.searchLocation;
    // console.log(searchLocation);

    var yelp = new Yelp({
      consumer_key: 'obLXq4WPpu0CLtkOVbzvTg',
      consumer_secret: 'dVIHqPYTLe4OA_rkY8DL4-ekEEs',
      token: '4EBs2Vqr3pRUmNYf5jHTEM97Yk5gzRT0',
      token_secret: '_lJ-bAXv97rODt9azOwY_PGLCAw',
    });

    yelp.search({ term: 'bar', location: searchLocation })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  };

  this.getUserBars = function(req, res) {

  };

  this.addUserBar = function(req, res) {

  };

  this.deleteUserBar = function(req, res) {

  };

  this.getAllBars = function(req, res) {

  };

}

module.exports = BarHandler;