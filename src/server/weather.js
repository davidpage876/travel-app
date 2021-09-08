const dateUtilities = require('./date');
const fetch = require('node-fetch');

/**
 * Weather retrieval service using the Weatherbit API (https://www.weatherbit.io/api).
 *
 * @constructor
 * @param {string} key API key to use.
 * @param {string} lang Language code to use.
 */
function WeatherbitService(key, lang) {

    this._key = key;
    this._lang = lang;

    /**
     * Make API request to given URL endpoint and return response JSON data.
     *
     * @param {string} url Endpoint URL to make fetch request to.
     * @returns {Object} Response JSON data.
     */
    this._handleRequest = async function(url) {
        const result = await fetch(url);
        try {
            console.log(result);
            const response = await result.json();
            console.log(response);
            return response;
        } catch (error) {
            console.log("Request failed: " + error);
            res.status(500).json({ error });
        }
    }

    /**
     * Looks up weather data for the given location at the given date (asynchronous).
     *
     * If the date is today, returns the current weather.
     * If the date is in the past, returns historical weather.
     * If the date is in the future, returns forecast weather when available,
     * otherwise returning historical weather.
     *
     * @abstract
     * @param {Number} lat Location latitude.
     * @param {Number} lon Location longitude.
     * @param {Date} date Date to look up.
     * @returns {Object} Retrieved weather data.
     * @throws {Error} Throws if weather retrieval failed.
     */
    this.get = async function(lat, lon, date) {
        console.log(`${lat}, ${lon}, ${date}`);

        // Get number of days between today and date.
        const today = new Date();
        const delta = dateUtilities.calculateDaysDelta(today, date);
        console.log(`From today (${today}) to date (${date}): ${delta}`);

        // Retrieve weather data.
        const commonParams = `key=${this._key}&lang=${this._lang}`;
        if (delta === 0) {

            // Get current weather at location.
            const base = 'https://api.weatherbit.io/v2.0/current';
            const requestUrl = `${base}?${commonParams}&lat=${lat}&lon=${lon}`;
            console.log(requestUrl);
            const response = await this._handleRequest(requestUrl);
            return response;

        } else if (delta <= 16) {

            // Get weather forecast (up to 16 days) at location.
            const base = 'https://api.weatherbit.io/v2.0/forecast/daily';
            const requestUrl = `${base}?${commonParams}&lat=${lat}&lon=${lon}`;
            console.log(requestUrl);
            const response = await this._handleRequest(requestUrl);
            return response;

        } else {

            // Get historical weather at location.

        }
    }

}

exports.WeatherbitService = WeatherbitService;