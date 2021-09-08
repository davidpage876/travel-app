import { calculateDaysDelta } from '../../src/server/date';

describe('Testing date utility function', () => {
    test('calculateDaysDelta() exists', () => {
        expect(calculateDaysDelta).toBeDefined();
    });
    test('calculateDaysDelta() with same day', () => {
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('01/01/2020'))).toBe(0);
    });
    test('calculateDaysDelta() with days after', () => {
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('01/02/2020'))).toBe(1);
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('01/03/2020'))).toBe(2);
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('01/04/2020'))).toBe(3);
        expect(calculateDaysDelta(new Date('01/01/2020'), new Date('02/01/2020'))).toBe(31);
    });
    test('calculateDaysDelta() with days before', () => {
        expect(calculateDaysDelta(new Date('01/02/2020'), new Date('01/01/2020'))).toBe(-1);
        expect(calculateDaysDelta(new Date('01/03/2020'), new Date('01/01/2020'))).toBe(-2);
        expect(calculateDaysDelta(new Date('01/04/2020'), new Date('01/01/2020'))).toBe(-3);
        expect(calculateDaysDelta(new Date('02/01/2020'), new Date('01/01/2020'))).toBe(-31);
    });
});