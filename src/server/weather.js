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
    this.get = async function(lat, lon, date) {}

}

exports.WeatherbitService = WeatherbitService;