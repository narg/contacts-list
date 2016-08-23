var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var redisStore = require('connect-redis')(session);
var redis = require('redis');
var bodyParser = require('body-parser');

var handlebars = require('./modules/handlebars');
var authenticator = require('./modules/authenticator');
var routes = require('./routes/index');
var auth = require('./routes/auth');
var contacts = require('./routes/contacts');

var config = require('./config/config.json');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries', express.static(path.join(__dirname, 'libraries')));


/**
 * Enable express session
 */

var redisClient = redis.createClient(config.redis.port, config.redis.host, config.redis.options);
app.use(session({
    store: new redisStore({client: redisClient}),
    secret: config.redis.secret,
    resave: false,
    saveUninitialized: false
}));

/**
 * Initialize Authenticator module and passport session
 */
app.use(authenticator.initialize());
app.use(authenticator.session());

app.use('/', routes);
app.use('/auth', auth);
app.use('/contacts', contacts);

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
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
