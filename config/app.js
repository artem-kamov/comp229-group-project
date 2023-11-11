var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var productRouter = require('../routes/products');

var app = express();

// Enables cors.
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message
  });
});

module.exports = app