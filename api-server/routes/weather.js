const express = require('express');
const router = express.Router();
const WeatherData = require("../models/WeatherData")

router.get('/:date?/:hour?', async (req, res, next) => {
    // TODO: Database interaction
    const date = req.query["date"] || req.params["date"] || req.app.getDate();
    const hour = req.query["hour"] || req.params["hour"] || req.app.getHour();

    try {
        const weather = await WeatherData.findOne({ date, hour});
        if (!weather) throw new Error(`Weather data not existed on ${date} at ${hour}`);

        res.json(weather);
        res.status(200)
    } catch (err) {
        res.json({ error: err.message || err });
        res.status(404);
    }

    next();
});

router.post('/',async (req, res, next) => {
    try {
        const weatherData = await new WeatherData({
            date: res.body["date"] || res.app.getDate(),
            hour: res.body['hour'] || res.app.getHour(),
            temperature: res.body['temperature'],
            humidity: res.body['humidity']
        });
        await weatherData.save();

        res.json(req.body);
        res.status(201);
    } catch (err) {
        res.json({ error: err.message });
        res.status(400);
    }

    next();
})

module.exports = router;
