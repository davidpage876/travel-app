import { postData } from './request';

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
 * Set up the main input form.
 */
 function setUp() {
    const HOST = 'http://localhost:8080';
    const inputForm = document.getElementById('input-form');
    const destInput = inputForm.dest;
    const dateInput = inputForm.date;

    // Ensure date input cannot be earlier than today.
    dateInput.min = new Date().toISOString().slice(0, 10);

    // Set up event listener for form submit.
    inputForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate input.
        try {
            destInput = validateDestination(destInput);
            dateInput = validateDate(dateInput);

        } catch (error) {
            console.log(`Invalid input error: ${error}`);

            // TODO: Show message to user.
            return;
        }

        // Submit form.
        try {
            console.log('Submitting form...');

            // TODO: Get lat/lon from GeoNames API.

            const response = await postData(`${HOST}/weather`, { });

            // TODO: Show weather info to user.
            console.log(response);

        } catch (error) {
            console.log(`Request failed: ${error}`);

            // TODO: Show message to user.
            return;
        }
    })
}

export { validateDestination, validateDate, setUp }