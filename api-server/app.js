const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather')

const app = express();

// connect to MongoDB
(async () => {
        try {
            await mongoose.connect("mongodb+srv://iot:p2DRWa6YoZjtufMN@mongodb.z5sfj.azure.mongodb.net/iot?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            console.log("Database connected!");
        } catch (e) {
            console.error("Failed connecting to the database...")
            process.exit(1);
        }
    }
)();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// retrieve user requested URL
app.use((req, res, next) => {
    app.set("requestUrl", `${req.protocol}://${req.get('host')}`);
    next();
});

// set date and hour strings
app.getDate = () => moment().format("YYYYMMDD");
app.getHour = () => parseInt(moment().format("H"))

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

module.exports = app;
