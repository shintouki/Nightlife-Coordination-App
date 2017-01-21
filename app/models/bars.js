'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
  rating: Number,
  name: String,
  url: String,
  snippet_text: String,
  image_url: String,
  businessId: String,
  numAttending: Number
});

module.exports = mongoose.model('Bar', Bar);