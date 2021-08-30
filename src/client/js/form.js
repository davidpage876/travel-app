
/**
 * Validates the given destination input.
 *
 * Expects non-blank input.
 *
 * @param {string} dest Input destination string.
 * @throws {Error} Thrown if validation failed.
 */
function validateDestination(dest) {
    if (!dest.trim()) {
        throw new Error('Destination cannot be blank');
    }
}

/**
 * Validates the given date input.
 *
 * Expects the format YYYY-MM-DD, where the date is today or in the future.
 *
 * @param {string} date Input date string.
 * @throws {Error} Thrown if validation failed.
 */
function validateDate(date) {

}

export { validateDestination, validateDate }