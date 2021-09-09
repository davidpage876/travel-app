import { getData, postData } from './request';
import { getWeatherIconClassFromCode } from './weather-icon';

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
    const submitInput = inputForm.submit;

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

        // Clear any previous error message.
        const errorText = document.getElementById('error');
        errorText.innerText = '';

        // Validate input.
        try {
            dest = validateDestination(dest);
            date = validateDate(date);

        } catch (error) {
            console.log(`Invalid input error: ${error}`);

            // Display error to user.
            errorText.innerText += error;
            return;
        }

        // Submitting form.
        console.log('Submitting form...');

        // Disable form buttons.
        destInput.disabled = true;
        dateInput.disabled = true;
        submitInput.disabled = true;

        // Show loading message.
        const inputForm = document.getElementById('input-form');
        inputForm.classList.add('loading');

        // Clear any previous results.
        const results = document.getElementById('results');
        results.innerHTML = '';

        // Get latitude and longitude for location.
        let location = undefined;
        try {
            location = await getData(`${HOST}/latlon?loc=${encodeURI(dest)}`);
            if (location.lat === undefined || location.lon === undefined) {
                throw new Error('Could not find location');
            }
            console.log(location.lat);
            console.log(location.lon);
        } catch (error) {
            console.log(`Location request failed: ${error}`);

            // Display error to user.
            errorText.innerText += error;
        }

        // Request information about location.
        if (location) {

            // Request image for location.
            const imageRequest = getData(`${HOST}/image?loc=${encodeURI(dest)}`);

            // Request weather for location and date.
            const weatherRequest = postData(`${HOST}/weather`, {
                lat: location.lat,
                lon: location.lon,
                date: date
            });

            // Handle image request.
            (async () => {
                try {
                    const image = await imageRequest;
                    console.log(image);

                    // Display results to user.
                    results.innerHTML += `
                        <div class="results__img-container">
                            <img class="results__img" src="" alt="">
                        </div>
                    `;

                } catch (error) {
                    console.log(`Image request failed: ${error}`);

                    // Display error to user.
                    errorText.innerText += error;
                }
            })();

            // Handle weather request.
            (async () => {
                try {
                    const weather = await weatherRequest;
                    console.log(weather);

                    // Display results to user.
                    results.innerHTML += `
                        <h2 class="results__loc">${weather.loc}</h2>
                        <p class="results__timezone">Timezone: ${weather.timezone}</p>
                        <h3 class="results__weather">Weather<sup>*</sup></h3>
                        <p class="results__desc">${weather.desc}</p>
                        <p class="results__icon"><i class="icon wi ${getWeatherIconClassFromCode(weather.icon)}" aria-hidden="true"></i></p>
                        <p class="results__temp">
                            <span class="results__temp-degrees">${weather.temp}</span>
                            <span class="results__temp-unit-symbol" title="degrees">°</span>
                            <span class="results__temp-unit-letter" title="celcius">C</span></p>
                        <aside class="results__note"><p>* Forecasts only available for up to 16 days</p></aside>
                    `;
                }
                catch (error) {
                    console.log(`Weather request failed: ${error}`);

                    // Display error to user.
                    errorText.innerText += error;
                }
            })();
        }

        // Hide loading message.
        inputForm.classList.remove('loading');

        // Re-enable form buttons.
        destInput.disabled = false;
        dateInput.disabled = false;
        submitInput.disabled = false;
    })
}

export { validateDestination, validateDate, setUp }