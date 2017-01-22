'use strict';

module.exports = {
  'twitterAuth': {
    'consumerKey': process.env.TWITTER_KEY,
    'consumerSecret': process.env.TWITTER_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
  },
  'yelpAuth': {
    'consumer_key': process.env.YELP_KEY,
    'consumer_secret': process.env.YELP_SECRET,
    'token': process.env.YELP_TOKEN,
    'token_secret': process.env.YELP_TOKEN_SECRET
  }
};
