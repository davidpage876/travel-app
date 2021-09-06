// Retrieve API keys from environment.
const dotenv = require('dotenv');
dotenv.config();
const geonamesUser = process.env.GEONAMES_USER;
const weatherbitKey = process.env.WEATHERBIT_KEY;

// Set up weather retrieval service.
const weather = require('./weather');
const weatherService = new weather.WeatherbitService(weatherbitKey, "en");

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

// Retrieve HTML on root GET route.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Request latitude and longitude for location GET route.
// Expects parameter: ?loc=___ .
app.get('/latlon', async (req, res) => {
    const loc = req.query.loc;
    console.log(loc);

    // API request url.
    const base = 'http://api.geonames.org/geoCodeAddressJSON';
    const requestUrl = `${base}?q=${encodeURI(loc)}&username=${geonamesUser}`;
    console.log(requestUrl);

    // Make API request and send the results to client.
    try {

        const response = await fetch(requestUrl);
        //console.log(response);
        const data = await response.json();
        console.log(data);
        res.json({
            lat: data.address.lat,
            lon: data.address.lng
        });

    } catch (error) {
        console.log('Request failed: ' + error);
        res.status(500).json({ error });
    }
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
