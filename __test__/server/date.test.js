import { calculateDaysDelta } from '../../src/server/date';

describe('Testing date utility function', () => {
    test('calculateDaysDelta() exists', () => {
        expect(calculateDaysDelta).toBeDefined();
    });
});