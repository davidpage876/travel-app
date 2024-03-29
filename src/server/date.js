/**
 * Calculates the number of days between two dates.
 *
 * @param {Date} from The first date.
 * @param {Date} to The second date.
 * @returns {Number} Returns the difference in days between two dates as an integer.
 * If 'to' comes after 'from' the result will be positive.
 * If 'to' is on the same day as 'from' the result will be zero.
 * If 'to' comes before 'from' the result will be negative.
 */
function calculateDaysDelta(from, to) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const timeDelta = to.getTime() - from.getTime();
    const dayDelta = timeDelta / MILLISECONDS_PER_DAY;

    return Math.round(dayDelta);
}

exports.calculateDaysDelta = calculateDaysDelta;