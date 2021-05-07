const express = require('express');
const router = express.Router();
const WeatherData = require("../models/WeatherData")

router.get('/:date?/:hour?', async (req, res, next) => {
    // TODO: Database interaction
    try {
        const date = req.query["date"] || req.params["date"] || req.app.getDate();
        const hour = req.query["hour"] || req.params["hour"] || req.app.getHour();

        const weather = await WeatherData.findOne({ date, hour});
        if (!weather) throw new Error(`Weather data not existed on ${date} at ${hour}`);

        res.status(200)
        res.json(weather);
    } catch (err) {
        res.status(404);
        res.json({ error: err.message || err });
    }

    next();
});

router.post('/',async (req, res, next) => {
    try {
        const weatherData = await new WeatherData({
            date: res.body['date'] || res.app.getDate(),
            hour: res.body['hour'] || res.app.getHour(),
            temperature: res.body['temperature'],
            humidity: res.body['date']
        });

        await weatherData.save();

        res.status(201);
        res.json(req.body);
    } catch (err) {
        res.status(400);
        res.json({ error: err.message });
    }

    next();
})

module.exports = router;
