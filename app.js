var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helo = require('./routes/helo');
var get = require('./routes/get');
var zip = require('./routes/zip.js');
var flightdrone = require('./routes/flightdrone.js');
var deletefile = require('./routes/delete.js');
var init = require("./routes/init.js");
var getmovie = require("./routes/getmovie.js");
var obtainingGraphData = require("./routes/obtainingGraphData.js");
var mqttClient = require("./routes/mqttClient");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/helo', helo);
app.use('/get',get);
app.use('/zip',zip);
app.use('/flightdrone',flightdrone);
app.use('/delete',deletefile);
app.use('/init',init);
app.use('/getmovie.zip',getmovie);
app.use("/graphdata",obtainingGraphData);

mqttClient();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//