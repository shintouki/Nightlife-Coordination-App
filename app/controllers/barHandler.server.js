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
      var businesses = data.businesses;
      var returnArr = [];
      for (var i = 0; i < businesses.length; i++) {
        var business = businesses[i];
        var businessDataObj = {
          rating: business.rating,
          name: business.name,
          url: business.url,
          snippet_text: business.snippet_text,
          image_url: business.image_url,
          id: business.id
        };
        returnArr.push(businessDataObj);
      }

      res.json(returnArr);
    })
    .catch(function (err) {
      console.error(err);
    });
  };

  this.getUserBarIds = function(req, res) {
    Users
      .findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
      .exec(function(err, result) {
        if (err) { throw err; }
        
        res.json(result.userBars);
      });
  };

  this.addUserBar = function(req, res) {
    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
        {
          
        })
      .exec(function(err, result) {

      });
  };

  this.deleteUserBar = function(req, res) {

  };

  this.getAllBars = function(req, res) {

  };

}

module.exports = BarHandler;