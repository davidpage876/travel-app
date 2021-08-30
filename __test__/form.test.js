import { validateDestination, validateDate } from "../src/client/js/form";

describe("Testing form validation", () => {
    test('validateDestination() exists', () => {
        expect(validateDestination).toBeDefined();
    });
    test('validateDestination() on good input', () => {
        expect(validateDestination('Tokyo')).toBe('Tokyo');
        expect(validateDestination('San Francisco')).toBe('San Francisco');
        expect(validateDestination(' London  ')).toBe('London');
    });
    test('validateDestination() on blank input', () => {
        expect(() => validateDestination('')).toThrow(Error);
        expect(() => validateDestination(' ')).toThrow(Error);
        expect(() => validateDestination('    ')).toThrow(Error);
    });

    test('validateDate() exists', () => {
        expect(validateDate).toBeDefined();
    });
    test('validateDate() on good input', () => {
        expect(validateDate('2020-08-25')).toBe('2020-08-25');
        expect(validateDate('2020-08-31')).toBe('2020-08-31');
        expect(validateDate('2020-08-01')).toBe('2020-08-01');
        expect(validateDate('2010-06-01')).toBe('2010-06-01');
        expect(validateDate('2010-06-30')).toBe('2010-06-30');
    });
});