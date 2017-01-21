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
    var rating = req.body.rating;
    var name = req.body.name;
    var url = req.body.url;
    var snippet_text = req.body.snippet_text;
    var image_url = req.body.image_url;

    // Add business id to user doc if it's not in there already
    Users
      .findOne({ 'twitter.id': req.user.twitter.id })
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          var businessIdList = doc.userBars.businessIdList;
          if (businessIdList.indexOf(buttonId) === -1) {
            // Add id to list if not found
            businessIdList.push(buttonId);
          }

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
          })
        }
      });

    // Update number of people going in bar doc
    Bars
      .findOne({ 'businessId': buttonId})
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          // Bar already exists in DB so just update the number attending
          doc.numAttending++;

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
            res.send(doc);
          })
        }
        else {
          // Bar does not exist in DB so create bar and save.
          var newBar = new Bars();
          newBar.rating = rating;
          newBar.name = name;
          newBar.url = url;
          newBar.snippet_text = snippet_text;
          newBar.image_url = image_url;
          newBar.numAttending = 1;
          newBar.businessId = buttonId;

          newBar.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
            // You can't send doc because doc did not exist.
            // So send the newly created newBar doc
            // res.send(doc);
            res.send(newBar);
          });
        }

      });

  };

  this.deleteUserBar = function(req, res) {
    var buttonId = req.body.buttonId;

    // Remove bar from user bar id list
    Users
      .findOne({ 'twitter.id': req.user.twitter.id })
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          var businessIdList = doc.userBars.businessIdList;
          if (businessIdList.indexOf(buttonId) !== -1) {
            businessIdList.splice(businessIdList.indexOf(buttonId));
          }

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
          })
        }
      });

      Bars
      .findOne({ 'businessId': buttonId})
      .exec(function(err, doc) {
        if (err) {
          res.send(null, 500);
        }
        else if (doc) {
          // Decrement numAttending by 1 since user is not going anymore
          doc.numAttending--;

          doc.save(function(err, doc) {
            if (err) {
              res.send(null, 500);
            }
            res.send(doc);
          })
        }

      });

  };

  this.getAllBars = function(req, res) {
    Bars
      .find()
      .exec(function (err, result) {
        if (err) { throw err; }
        if (result) {
          var resultObj = {};
          for (var i=0; i<result.length; i++) {
            var businessId = result[i]['businessId'];
            resultObj[businessId] = result[i];
          }
   
          res.json(resultObj);
        }
      });
  };

}

module.exports = BarHandler;