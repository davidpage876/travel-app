// Retrieve API keys from environment.
const dotenv = require('dotenv');
dotenv.config();
const geonamesUser = process.env.GEONAMES_USER;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

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

    // API request url.
    const base = 'http://api.geonames.org/geoCodeAddressJSON';
    const requestUrl = `${base}?q=${encodeURI(loc)}&username=${geonamesUser}`;
    console.log(requestUrl);

    // Make API request and send the results to client.
    try {

        const response = await fetch(requestUrl);
        const data = await response.json();
        res.json({
            lat: data.address.lat,
            lon: data.address.lng
        });

    } catch (error) {
        console.log('Request failed: ' + error);
        res.status(500).json({ error });
    }
});

// Request image search GET route.
// Expects parameter: ?q=___ .
app.get('/image', async (req, res) => {
    const q = req.query.q;

    // API request url.
    const base = 'https://pixabay.com/api/';
    const options = 'order=latest&image_type=photo&orientation=horizontal&per_page=3';
    const requestUrl = `${base}?key=${pixabayKey}&q=${encodeURI(q)}&${options}`;
    console.log(requestUrl);

    // Make API request and send the results to client.
    try {

        const response = await fetch(requestUrl);
        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.log('Request failed: ' + error);
        res.status(500).json({ error });
    }
});

// Request weather forecast POST route.
app.post('/weather', async (req, res) => {
    try {

        // Make API request.
        const lat = req.body.lat;
        const lon = req.body.lon;
        const date = new Date(req.body.date);
        const summary = await weatherService.get(lat, lon, date);

        // Send summary of results to client.
        res.send(summary)

    } catch (error) {
        console.log('Request failed: ' + error);
        res.status(500).json({ error });
    }
});

// Start production server on port 8080.
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
