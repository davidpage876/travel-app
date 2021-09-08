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
            res.status(500).json({ error });
            throw error;
        }
    }

    /**
     * Looks up weather data for the given location at the given date (asynchronous).
     *
     * If the date is today, returns the today's weather.
     * If the date is in the past, returns today's weather (Note: historical weather is not available on free plan).
     * If the date is in the future, returns forecast weather when available (supports up to 16 days),
     * otherwise returning today's weather.
     *
     * @abstract
     * @param {Number} lat Location latitude.
     * @param {Number} lon Location longitude.
     * @param {Date} date Date to look up.
     * @returns {Object} Summary of retrieved weather data.
     * {
     *      temp: Temperature in Celcius,
     *      desc: Text weather description,
     *      icon: Weather icon code (see https://www.weatherbit.io/api/codes)
     * }
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
        if (delta > 0 && delta <= 16) {

            // Get weather forecast (up to 16 days) at location.
            const base = 'https://api.weatherbit.io/v2.0/forecast/daily';
            const requestUrl = `${base}?${commonParams}&lat=${lat}&lon=${lon}`;
            console.log(requestUrl);
            const response = await this._handleRequest(requestUrl);
            const dayData = response.data[delta - 1];
            const summary = {
                temp: dayData.temp,
                desc: dayData.weather.description,
                icon: dayData.weather.icon
            };
            return summary;

        } else {

            // Get current weather at location.
            const base = 'https://api.weatherbit.io/v2.0/current';
            const requestUrl = `${base}?${commonParams}&lat=${lat}&lon=${lon}`;
            console.log(requestUrl);
            const response = await this._handleRequest(requestUrl);
            const dayData = response.data[0];
            const summary = {
                temp: dayData.temp,
                desc: dayData.weather.description,
                icon: dayData.weather.icon
            };
            return summary;

        }
    }

}

exports.WeatherbitService = WeatherbitService;