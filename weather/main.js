const sensor = require('node-dht-sensor').promises;
const axios = require("axios").default;

(async () => {
    try {
        const res = await sensor.read(11, 14);
        await axios.post("http://localhost:3000/weather", {
            temperature: res.temperature.toFixed(1),
            humidity: res.humidity.toFixed(1)
        })
    } catch (err) {
        console.error("Failed to read data: ", err);
    }
})();