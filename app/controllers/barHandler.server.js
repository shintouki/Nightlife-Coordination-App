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
      .exec(function(err, doc) {
        if (err) { throw err; }
        
        res.json(doc.userBars);
      });
  };

  this.addUserBar = function(req, res) {
    var buttonId = req.body.buttonId;
    // console.log("button id is: " + buttonId);

    Users
      .findOne({ 'twitter.id': req.user.twitter.id })
      .exec(function(err, doc) {
        var businessIdList = doc.userBars.businessIdList;
        // console.log(businessIdList);
        if (businessIdList.indexOf(buttonId) === -1) {
          // console.log("id not found...");
          businessIdList.push(buttonId);
        }

        doc.save(function(err, doc) {
          if (err) {
            res.send(null, 500);
          }
        })

        res.json(doc.userBars);
      });
  };

  this.deleteUserBar = function(req, res) {

  };

  this.getAllBars = function(req, res) {

  };

}

module.exports = BarHandler;