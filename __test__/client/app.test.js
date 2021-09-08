import { validateDestination, validateDate } from "../../src/client/js/app";

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
    test('validateDate() on bad input', () => {
        expect(() => validateDate('2020-8-25')).toThrow(Error);
        expect(() => validateDate('2020-08-5')).toThrow(Error);
        expect(() => validateDate('08-25-2020')).toThrow(Error);
        expect(() => validateDate('2020 08 25')).toThrow(Error);
        expect(() => validateDate('20-08-25')).toThrow(Error);
        expect(() => validateDate('2020-08-32')).toThrow(Error);
        expect(() => validateDate('2020-13-25')).toThrow(Error);
        expect(() => validateDate('2020-00-25')).toThrow(Error);
        expect(() => validateDate('2020-08-00')).toThrow(Error);
        expect(() => validateDate('200-08-25')).toThrow(Error);
        expect(() => validateDate('YYYY-08-25')).toThrow(Error);
        expect(() => validateDate('2020-MM-25')).toThrow(Error);
        expect(() => validateDate('2020-0210-31')).toThrow(Error);
    });
});