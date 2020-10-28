var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
let cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inputformRouter=require('./routes/inputForm');
var signupRouter=require('./routes/signup');
var loginRouter=require('./routes/login');
var dashboardRouter=require('./routes/dashboard');
var tableelementsRouter=require('./routes/tableelements');

var app = express();
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inputform',inputformRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/dashboard',dashboardRouter);
app.use('/tableelements',tableelementsRouter);

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
