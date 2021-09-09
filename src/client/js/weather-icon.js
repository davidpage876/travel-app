/**
 * Retrieves the Weather Icon class corresponding to the given WeatherBit icon code.
 *
 * Based on:
 * 'Weather Icons' by Erik Flowers (../styles/weather-icons.min.css) and
 * 'WeatherBit' (https://www.weatherbit.io/api).
 *
 * @param {String} code WeatherBit icon code.
 * @returns {String} Weather Icon class.
 */
function getWeatherIconClassFromCode(code) {
    switch (code) {
        case 'c01d':
            return 'wi-day-sunny';
        case 'c01n':
            return 'wi-night-clear';
        case 'c02d':
        case 'c03d':
        case 'c04d':
            return 'wi-day-cloudy';
        case 'c02n':
        case 'c03n':
        case 'c04n':
            return 'wi-night-alt-cloudy';
        case '03d':
        case '03n':
            return 'wi-cloud';
        case '04d':
        case '04n':
            return 'wi-cloudy';
        case 'd01d':
        case 'd02d':
        case 'd03d':
        case 'r04d':
        case 'r05d':
            return 'wi-day-showers'
        case 'd01n':
        case 'd02n':
        case 'd03n':
        case 'r04n':
        case 'r05n':
            return 'wi-night-showers';
        case 'r01d':
        case 'r02d':
        case 'r03d':
        case 'f01d':
        case 'r06d':
        case 'u00d':
            return 'wi-day-rain';
        case 'r01n':
        case 'r02n':
        case 'r03n':
        case 'f01n':
        case 'r06n':
        case 'u00n':
            return 'wi-night-rain';
        case 't01d':
        case 't02d':
        case 't03d':
        case 't04d':
        case 't05d':
            return 'wi-day-thunderstorm';
        case 't01n':
        case 't02n':
        case 't03n':
        case 't04n':
        case 't05n':
            return 'wi-night-thunderstorm';
        case 's01d':
        case 's02d':
        case 's03d':
        case 's04d':
        case 's05d':
        case 's06d':
            return 'wi-day-snow';
        case 's01n':
        case 's02n':
        case 's03n':
        case 's04n':
        case 's05n':
        case 's06n':
            return 'wi-night-snow';
        case 'a01d':
        case 'a02d':
        case 'a03d':
        case 'a04d':
        case 'a05d':
        case 'a06d':
            return 'wi-day-fog';
        case 'a01n':
        case 'a02n':
        case 'a03n':
        case 'a04n':
        case 'a05n':
        case 'a06n':
            return 'wi-night-fog';
        default:
            return 'wi-cloud';
    }
}

export { getWeatherIconClassFromCode }