'use strict';

var path = process.cwd();
var BarHandler = require(path + '/app/controllers/barHandler.server.js');

module.exports = function(app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect('/search');
    }
  }

  var barHandler = new BarHandler();

  app.route('*')
    .get(function(req, res, next) {
    // Place user into res.locals for easy access from templates
    res.locals.user = req.user || null;
    next();
  });

  app.route('/search')
    .get(function(req, res) {
      res.render('search');
    });

  app.route('/yelp-search')
    .get(barHandler.yelpSearch);

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/search');
    });

  app.route('/mybars')
    .get(isLoggedIn, function(req, res) {
      res.render('my-bars');
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/after-twitter-auth',
      failureRedirect: '/search'
    }));

  app.route('/after-twitter-auth')
    .get(isLoggedIn, function(req, res) {
      res.render('after-twitter-auth');
    });

  app.route('/api/allbars')
    .get(barHandler.getAllBars);

  app.route('/api/:id')
    .get(isLoggedIn, function(req, res) {
      res.json(req.user.twitter);
    });

  app.route('/api/:id/bars')
    .get(isLoggedIn, barHandler.getUserBarIds)
    .post(isLoggedIn, barHandler.addUserBar)
    .delete(isLoggedIn, barHandler.deleteUserBar);

  app.route('*')
    .get(function (req, res) {
      res.redirect('/search');
    });

};
