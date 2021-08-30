import { validateDestination, validateDate } from "../src/client/js/form";

describe("Testing form validation", () => {
    test("validateDestination() exists", () => {
        expect(validateDestination).toBeDefined();
    });
    test("validateDestination() on good input", () => {
        expect(validateDestination('Tokyo')).toBe('Tokyo');
        expect(validateDestination('San Francisco')).toBe('San Francisco');
        expect(validateDestination(' London  ')).toBe('London');
    });
    test("validateDestination() on blank input", () => {
        expect(() => validateDestination('')).toThrow(Error);
        expect(() => validateDestination(' ')).toThrow(Error);
        expect(() => validateDestination('    ')).toThrow(Error);
    });

    test("validateDate() exists", () => {
        expect(validateDate).toBeDefined();
    });
});