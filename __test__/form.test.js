import { validateDestination, validateDate } from "../src/client/js/form";

describe("Testing form validation", () => {
    test("validateDestination() exists", () => {
        expect(validateDestination).toBeDefined();
    })
    test("validateDestination() on good input", () => {
        expect(() => validateDestination('Tokyo')).not.toThrow(Error);
        expect(() => validateDestination('San Francisco')).not.toThrow(Error);
        expect(() => validateDestination('London')).not.toThrow(Error);
    })
    test("validateDestination() on blank input", () => {
        expect(() => validateDestination('')).toThrow(Error);
        expect(() => validateDestination(' ')).toThrow(Error);
        expect(() => validateDestination('    ')).toThrow(Error);
    })

    test("validateDate() exists", () => {
        expect(validateDate).toBeDefined();
    })
});