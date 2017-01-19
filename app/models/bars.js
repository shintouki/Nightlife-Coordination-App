'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
  numAttending: Number
});

module.exports = mongoose.model('Bar', Bar);