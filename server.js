'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
// var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.set('views', process.cwd() + '/public/pug')
app.set('view engine', 'pug')

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/jquery', express.static(process.cwd() + '/node_modules/jquery/dist'));
app.use('/bootstrap/js', express.static(process.cwd() + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/css', express.static(process.cwd() + '/node_modules/bootstrap/dist/css'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});