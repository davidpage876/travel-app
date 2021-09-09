import { getIconClassFromCode } from "../../src/client/js/weather-icon";

describe("Testing weather icon management", () => {
    test('getIconClassFromCode() exists', () => {
        expect(getIconClassFromCode).toBeDefined();
    });
});