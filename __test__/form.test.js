import { validateDestination, validateDate } from "../src/client/js/form";

describe("Testing form validation", () => {
    test("validateDestination() exists", () => {
        expect(validateDestination).toBeDefined();
    })

    test("validateDate() exists", () => {
        expect(validateDate).toBeDefined();
    })
});