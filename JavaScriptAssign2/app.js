'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

mongoose.connect(
    'mongodb + srv://rav:rav@cluster0-oxrwb.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//Successfully connected message

var db = mongoose.connection;
db.on('error', () => console.log('There was an error connecting'));
db.once('open', () => console.log('We have connected to Mongo Atlas'));

var routes = require('./routes/index');
var users = require('./routes/users');
var authorRouter = require('./routes/authentic');
var advertRouter = require('./routes/advertisment');

const MongoStore = require('connect-mongo')(session);

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport session
//app.use(session({
  //  secret: 'secrettexthere',
  //  saveUninitialized: true,
   // resave: true
//}));
app.use(
    session({
        secret: 'unicorn',
        resave: false,
        saveUninitialized: true
    })
);

app.use('/', authorRouter);
app.use('/', advertRouter);
app.use('/', routes);
app.use('/users', users);
app.use('/users', require('./routes/users'));
app.use('/users', require('./routes/advertisment'));

//Serialize user
 passport.serializeUser(function (user, done) {
    done(null, user.id)
});

//Deserialize user try to find username
passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) {
        done(err, user);
    });
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
