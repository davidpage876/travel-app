// Retrieve API keys from environment.
const dotenv = require('dotenv');
dotenv.config();
const geonamesUser = process.env.GEONAMES_USER;

// Set up weather retrieval service.
const weather = require('./weather');
const weatherService = new weather.WeatherbitService("*******", "en");

// Set up express server.
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(cors());

// Allow us to make fetch-style requests on the server.
const fetch = require('node-fetch');

// Retrieve HTML on root get route.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Request weather forecast POST route.
app.post('/weather', async (req, res) => {
    console.log(req.body);
    try {

        // Make API request.
        const lat = req.body.lat;
        const lon = req.body.lon;
        const date = req.body.date;
        const response = await weatherService.get(lat, lon, date);

        // Send results to client.
        res.send(response)
        console.log(response);

    } catch (error) {
        console.log('Request failed: ' + error);
        res.status(500).json({ error });
    }
});

// Example post route API request.
app.post('/example', async (req, res) => {

    console.log(req.body);

    // API request url.
    const base = '';
    const requestUrl = `${base}?key=`;

    console.log(requestUrl);

    // Make API request and send the results to client.
    const result = await fetch(requestUrl);
    try {
        console.log(result);
        const response = await result.json();
        res.send(response);
        console.log(response);
    } catch (error) {
        console.log("Request failed: " + error);
        res.status(500).json({ error });
    }
});

// Start production server on port 8080.
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
