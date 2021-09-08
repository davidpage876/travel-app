import { getData, postData } from './request';

/**
 * Validates the given destination input.
 *
 * Expects non-blank input.
 *
 * @param {string} dest Input destination string.
 * @throws {Error} Thrown if validation failed.
 * @returns The validated string (trimmed).
 */
function validateDestination(dest) {
    const trimmed = dest.trim();
    if (trimmed.length > 0) {
        return trimmed;
    } else {
        throw new Error('Destination cannot be blank');
    }
}

/**
 * Validates the given date input.
 *
 * Expects the format YYYY-MM-DD.
 *
 * Todo: Handle invalid dates and only allow today or future dates.
 *
 * @param {string} date Input date string.
 * @throws {Error} Thrown if validation failed.
 * @returns The validated string.
 */
function validateDate(date) {
    if (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date)) {
        return date;
    } else {
        throw new Error('Incorrect date format. Must be YYYY-MM-DD');
    }
}

/**
 * Set up the home page including input form.
 */
 function setUp() {
    const HOST = 'http://localhost:8080';
    const inputForm = document.getElementById('input-form');
    const destInput = inputForm.dest;
    const dateInput = inputForm.date;

    // Set the default estimated arrival date to today.
    const today = new Date().toISOString().slice(0, 10);
    dateInput.value = today;

    // Ensure date input cannot be earlier than today.
    dateInput.min = today;

    // Set up event listener for form submit.
    inputForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        let dest = destInput.value;
        let date = dateInput.value;

        // Validate input.
        try {
            dest = validateDestination(dest);
            date = validateDate(date);

        } catch (error) {
            console.log(`Invalid input error: ${error}`);

            // TODO: Show message to user.
            return;
        }

        // Submit form.
        try {
            console.log('Submitting form...');

            // Get latitude and longitude for location.
            const location = await getData(`${HOST}/latlon?loc=${encodeURI(dest)}`);
            console.log(location.lat);
            console.log(location.lon);

            // Look up weather for location and date.
            const weather = await postData(`${HOST}/weather`, {
                lat: location.lat,
                lon: location.lon,
                date: date
            });
            console.log(weather);

            // Display results to user.
            const results = document.getElementById('results');
            results.innerHTML = `
                <h2>${dest}</h2>
                <h3>Weather<sup>*</sup></h3>
                <p>${weather.desc}</p>
                <p><span>${weather.icon}</span></p>
                <p><span>${weather.temp}</span><span title="degrees">°</span><span title="celcius">C</span></p>
                <aside><p>* Forecasts only available for up to 16 days</p></aside>
            `;

        } catch (error) {
            console.log(`Request failed: ${error}`);

            // TODO: Show message to user.
            return;
        }
    })
}

export { validateDestination, validateDate, setUp }