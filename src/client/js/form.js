
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

export { validateDestination, validateDate }