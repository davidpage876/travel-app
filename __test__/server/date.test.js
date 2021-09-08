import { calculateDaysDelta } from '../../src/server/date';

describe('Testing date utility function', () => {
    test('calculateDaysDelta() exists', () => {
        expect(calculateDaysDelta).toBeDefined();
    });
    test('calculateDaysDelta() with same day', () => {
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('01/01/2020'))).toBe(0);
    });
});