const model = require("mongoose").model

const WeatherData = model("WeatherData", {
    date: {type: String, require: [true, 'Date is required']},
    hour: {type: Number, require: true, min: [0, "Hour should be greater than 0"], max: [23, 'Hour should be less than 23']},
    temperature: {type: Number, require: true, min: [0, 'Temperature should be greater than 0'], max: [50, 'Temperature should be less than 50']},
    humidity: {type: Number, require: true, min: [5, 'Humidity should be greater than 5'], max: [95, 'Humidity should be less than 95']}
});

module.exports = WeatherData;
