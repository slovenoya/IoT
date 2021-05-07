const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        weather_data_url: `${req.app.get("requestUrl")}/weather`
    });

    next();
});

module.exports = router;
