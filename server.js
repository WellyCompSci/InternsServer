var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var helmet = require('helmet');

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://38667df1808c42d480f308d7285e1483@sentry.io/1392749' });

const { MONGODB_HOST, PORT, HOST, ROUTE } = require('./config');

mongoose.connect(MONGODB_HOST, { useNewUrlParser: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', () => {
    console.log('DB Connected');

    var app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.set('trust proxy', true);
    app.set('trust proxy', 'loopback');


    var router = require("./routes");
    app.use(ROUTE, router);


    app.get('/', (req, res) => {
        res.status(200).send('Internship Server - WellyCompSci');
    });
    
    // catch 404 errors
    app.use((req, res, next) => {
        next(createError(404, `${req.originalUrl} - 404 not found on ${req.protocol}//${req.get('Host')}`));
    });
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!');
    })
    app.listen(PORT, HOST);
});
